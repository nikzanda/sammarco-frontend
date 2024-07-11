import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import {
  Button,
  Col,
  Flex,
  Input,
  Row,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
  Typography,
  theme,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaBan, FaCalendarCheck, FaExclamationTriangle, FaFileCsv, FaPlus } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { differenceInDays, format, isSameMonth, isSameYear, set } from 'date-fns';
import Highlighter from 'react-highlight-words';
import {
  MemberFilter,
  MemberListItemFragment,
  MemberSortEnum,
  SortDirectionEnum,
  useMembersQuery,
} from '../../generated/graphql';
import { PaymentCreateModal } from '../payments/components';
import { useDisplayGraphQLErrors } from '../../hooks';
import { ActionButtons, week } from '../../commons';
import { CourseTableFilter, ShiftTableFilter } from '../courses/components';
import { AttendanceCreateModal } from '../attendances/components';
import { getMonths, getYears } from '../../utils/utils';
import { ExportMembersModal, MemberExpandable } from './components';
import { DatePicker } from '../../components';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/member/';

const MemberListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const [memberInfo, setMemberInfo] = React.useState<{ memberId: string; courseIds: string[] }>();
  const [newPayment, setNewPayment] = React.useState(false);
  const [newAttendance, setNewAttendance] = React.useState(false);
  const [exportCsv, setExportCsv] = React.useState(false);

  const [searchText, setSearchText] = useLocalStorageState<string>(`${LOCAL_STORAGE_PATH}searchText`, {
    defaultValue: '',
  });
  const [pagination, setPagination] = useLocalStorageState(`${LOCAL_STORAGE_PATH}pagination`, {
    defaultValue: {
      pageIndex: 0,
      pageSize: PAGE_SIZE,
    },
  });
  const [filterInfo, setFilterInfo] = useLocalStorageState<Record<string, FilterValue | null>>(
    `${LOCAL_STORAGE_PATH}filterInfo`,
    {
      defaultValue: {},
    }
  );
  const [sortInfo, setSortInfo] = useLocalStorageState<SorterResult<MemberListItemFragment>>(
    `${LOCAL_STORAGE_PATH}sortInfo`,
    { defaultValue: { order: 'descend' } }
  );

  const queryFilter = React.useMemo(() => {
    let sortBy: MemberSortEnum;

    switch (sortInfo.columnKey) {
      case 'fullName':
        sortBy = MemberSortEnum.NAME;
        break;
      default:
        sortBy = MemberSortEnum.CREATED_AT;
    }

    const sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;

    const result: MemberFilter = {
      search: filterInfo.search?.length ? (filterInfo.search[0] as string).trim() : undefined,
      courseIds: filterInfo.courses?.length ? (filterInfo.courses as string[]) : undefined,
      shiftIds: filterInfo.shifts?.length ? (filterInfo.shifts as string[]) : undefined,
      monthsNotPaid: filterInfo.monthsNotPaid?.length ? (filterInfo.monthsNotPaid as number[]) : undefined,
      sortBy,
      sortDirection,
    };
    return result;
  }, [filterInfo, sortInfo]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useMembersQuery({
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      filter: queryFilter,
      years: getYears(),
    },
  });

  useDisplayGraphQLErrors(queryError);

  const members = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.members.data;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const total = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.members.pageInfo.total;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const columns = React.useMemo(() => {
    const result: TableColumnsType<MemberListItemFragment> = [
      {
        title: t('members.table.fullName'),
        key: 'fullName',
        dataIndex: 'fullName',
        sorter: true,
        render: (fullName, { attendances, payments, courses, medicalCertificate }) => {
          let showAlert = false;
          let alertColor = token.colorError;

          const differenceDays = medicalCertificate?.expireAt
            ? differenceInDays(medicalCertificate.expireAt, Date.now())
            : 0;
          if (!medicalCertificate || differenceDays <= 30) {
            showAlert = true;
            if (differenceDays > 10) {
              alertColor = token.colorWarning;
            }
          }

          const currentYears = getYears();

          if (
            attendances.length > 0 &&
            !payments.some(({ years }) => years && years[0] === currentYears[0] && years[1] === currentYears[1])
          ) {
            showAlert = true;
            alertColor = token.colorError;
          }

          const monthsPaid = getMonths()
            .filter((month) => month.valueOf() < Date.now())
            .some((month) => {
              const result = courses.some(({ id: courseId }) => {
                if (
                  attendances.some(
                    ({ from, course }) => isSameYear(from, month) && isSameMonth(from, month) && course.id === courseId
                  )
                ) {
                  return !payments.some(
                    ({ month: paymentMonth }) => paymentMonth && format(month, 'yyyy-MM') === paymentMonth
                  );
                }
                return false;
              });
              return result;
            });

          if (monthsPaid) {
            showAlert = true;
            alertColor = token.colorError;
          }

          return (
            <>
              <Highlighter
                searchWords={[searchText]}
                textToHighlight={fullName}
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              />{' '}
              {showAlert && (
                <Tooltip title={t('members.alerts.warnings')}>
                  <Icon component={FaExclamationTriangle} style={{ color: alertColor }} />
                </Tooltip>
              )}
            </>
          );
        },
      },
      {
        title: t('members.table.courses'),
        key: 'courses',
        dataIndex: 'courses',
        filterDropdown: CourseTableFilter,
        filteredValue: filterInfo.courses || null,
        render: (courses: MemberListItemFragment['courses']) => courses.map(({ name }) => name).join(', '),
      },
      {
        title: t('members.table.shifts'),
        key: 'shifts',
        dataIndex: 'courses',
        filterDropdown: ShiftTableFilter,
        filteredValue: filterInfo.shifts || null,
        render: (courses: MemberListItemFragment['courses'], { shiftIds }) => {
          const shifts = courses.reduce(
            (
              acc: { id: string; courseName: string; weekDay: number; from: [number, number]; to: [number, number] }[],
              { name, shifts: courseShifts }
            ) => {
              courseShifts.forEach((dayShifts, weekDay) => {
                dayShifts.forEach((shift) => {
                  if (shiftIds.includes(shift.id)) {
                    acc.push({
                      id: shift.id,
                      courseName: name,
                      weekDay,
                      from: shift.from as [number, number],
                      to: shift.to as [number, number],
                    });
                  }
                });
              });
              return acc;
            },
            []
          );
          return (
            <Space direction="vertical" size="small">
              {shifts.map((shift) => {
                const from = set(Date.now(), { hours: shift.from[0], minutes: shift.from[1] });
                const to = set(Date.now(), { hours: shift.to[0], minutes: shift.to[1] });
                const day = week.find(({ weekDay }) => weekDay === shift.weekDay)!;

                return (
                  <span key={shift.id}>
                    {t(`days.${day.label}`)}: {format(from, 'HH:mm')} - {format(to, 'HH:mm')}
                  </span>
                );
              })}
            </Space>
          );
        },
      },
      {
        key: 'actions',
        dataIndex: 'id',
        align: 'right',
        fixed: 'right',
        render: (id: string, { courses }) => (
          <ActionButtons
            buttons={['edit', 'fee', 'attendance']}
            onEdit={() => navigate(`/members/${id}`)}
            onFee={() => {
              setMemberInfo({
                memberId: id,
                courseIds: courses.map((course) => course.id),
              });
              setNewPayment(true);
            }}
            onAttendance={() => {
              setMemberInfo({
                memberId: id,
                courseIds: courses.map((course) => course.id),
              });
              setNewAttendance(true);
            }}
          />
        ),
      },
    ];
    return result;
  }, [filterInfo.courses, filterInfo.shifts, navigate, searchText, t, token.colorError, token.colorWarning]);

  const handleTableChange: TableProps<MemberListItemFragment>['onChange'] = (newPagination, filters, sorter) => {
    if (Object.values(filters).some((v) => v && v.length)) {
      setSearchText('');
      setFilterInfo(filters);
    } else {
      setFilterInfo({
        ...(searchText && { search: [searchText] }),
        ...(filterInfo.monthsNotPaid && { monthsNotPaid: filterInfo.monthsNotPaid }),
      });
    }
    setSortInfo(sorter as SorterResult<MemberListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={2}>{t('members.name')}</Typography.Title>
        <Flex gap={12}>
          <Button size="large" icon={<Icon component={FaFileCsv} />} onClick={() => setExportCsv(true)}>
            {t('commons.export.button')}
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<Icon component={FaPlus} />}
            onClick={() => navigate('/members/new')}
          >
            {t('members.new')}
          </Button>
        </Flex>
      </Flex>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={10}>
          <Input.Search
            placeholder={t('commons.searchPlaceholder')!}
            allowClear
            enterButton
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={(value) => {
              setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
              setFilterInfo({
                search: [value],
              });
            }}
          />
        </Col>

        <Col xs={24} sm={6}>
          <DatePicker
            value={filterInfo.monthsNotPaid && new Date(filterInfo.monthsNotPaid[0] as number)}
            size="large"
            picker="month"
            style={{ width: '100%' }}
            placeholder={t('members.filterByMonthsNotPaid')}
            onChange={(value) => {
              setFilterInfo({
                ...filterInfo,
                monthsNotPaid: value ? [value.getTime()] : null,
              });
            }}
          />
        </Col>

        <Col xs={24} sm={8} style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
          <Button
            size="large"
            icon={<Icon component={FaCalendarCheck} />}
            onClick={() => {
              setNewAttendance(true);
            }}
            disabled={selectedIds.length === 0}
          >
            {t('attendances.new')}
          </Button>
          <Button
            danger
            size="large"
            icon={<Icon component={FaBan} />}
            onClick={() => {
              setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
              setFilterInfo({});
              setSearchText('');
            }}
          >
            {t('buttons.resetFilter.label')}
          </Button>
        </Col>
      </Row>

      {selectedIds.length > 0 && <span>{t('commons.selected', { selected: selectedIds.length, total })}</span>}
      <Table
        dataSource={members}
        columns={columns}
        rowKey="id"
        loading={queryLoading}
        onChange={handleTableChange}
        pagination={{
          total,
          pageSize: pagination.pageSize,
          current: pagination.pageIndex + 1,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          showTotal: (total) => {
            const start = pagination.pageIndex * pagination.pageSize + 1;
            const end = start + (members.length < pagination.pageSize ? members.length : pagination.pageSize) - 1;
            return t('commons.table.pagination', { start, end, total });
          },
        }}
        rowSelection={{
          selections: [Table.SELECTION_NONE],
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedIds,
          onChange: (selectedRowKeys) => setSelectedIds(selectedRowKeys as string[]),
        }}
        expandable={{
          // eslint-disable-next-line react/no-unstable-nested-components
          expandedRowRender: (member) => <MemberExpandable member={member} />,
        }}
        scroll={{ x: 600 }}
      />
      {newPayment && memberInfo && (
        <PaymentCreateModal
          memberId={memberInfo.memberId}
          courseIds={memberInfo.courseIds}
          onCancel={() => {
            setMemberInfo(undefined);
            setNewPayment(false);
          }}
        />
      )}
      {newAttendance && memberInfo && (
        <AttendanceCreateModal
          memberIds={[memberInfo.memberId]}
          courseIds={memberInfo.courseIds}
          onCancel={() => {
            setMemberInfo(undefined);
            setNewAttendance(false);
          }}
        />
      )}
      {newAttendance && selectedIds.length > 0 && (
        <AttendanceCreateModal
          memberIds={selectedIds}
          courseIds={[
            ...members.reduce((acc: Set<string>, { id: memberId, courses }) => {
              if (!selectedIds.includes(memberId)) {
                return acc;
              }
              courses.forEach(({ id }) => {
                acc.add(id);
              });
              return acc;
            }, new Set<string>()),
          ]}
          onCancel={(success) => {
            setMemberInfo(undefined);
            setNewAttendance(false);
            if (success) {
              setSelectedIds([]);
            }
          }}
        />
      )}
      {exportCsv && <ExportMembersModal onCancel={() => setExportCsv(false)} />}
    </Space>
  );
};

export default MemberListPage;
