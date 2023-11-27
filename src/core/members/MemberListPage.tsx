import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import {
  Badge,
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
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaBan, FaCalendarCheck, FaPlus } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { format, set } from 'date-fns';
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

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/member/';

const MemberListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const [memberInfo, setMemberInfo] = React.useState<{ memberId: string; courseIds: string[] }>();
  const [newPayment, setNewPayment] = React.useState(false);
  const [newAttendance, setNewAttendance] = React.useState(false);

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
    let sortBy;
    let sortDirection;

    switch (sortInfo.columnKey) {
      case 'fullName':
        sortBy = MemberSortEnum.NAME;
        break;
      default:
        sortBy = MemberSortEnum.CREATED_AT;
    }
    if (sortBy) {
      sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;
    }

    const result: MemberFilter = {
      search: filterInfo.search?.length ? (filterInfo.search[0] as string).trim() : undefined,
      courseIds: filterInfo.courses?.length ? (filterInfo.courses as string[]) : undefined,
      shiftIds: filterInfo.shifts?.length ? (filterInfo.shifts as string[]) : undefined,
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
        render: (fullName, { currentMonthPayments, currentEnrollmentPayment, courses }) => {
          const badge = <Badge dot color="red" />;

          const courseMonthsNotPaid = courses.reduce((acc: typeof courses, course) => {
            const payments = currentMonthPayments.filter(({ fee }) => fee.course.id === course.id);
            if (payments.length === 0) {
              acc.push(course);
            } else {
              const paidAmount = payments.reduce((acc, { amount }) => acc + amount, 0);
              if (paidAmount < payments[0].fee.amount) {
                acc.push(course);
              }
            }

            return acc;
          }, []);

          return (
            <>
              {fullName}{' '}
              <Space size="small">
                {courseMonthsNotPaid.map((course) => (
                  <Tooltip
                    title={t('members.table.currentMonthNotPaid', {
                      course: course.name,
                      month: format(Date.now(), 'MMMM').toUpperCase(),
                    })}
                  >
                    {badge}
                  </Tooltip>
                ))}
                {!currentEnrollmentPayment && (
                  <Tooltip title={t('members.table.currentEnrollmentNotPaid')}>{badge}</Tooltip>
                )}
              </Space>
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
  }, [filterInfo, navigate, t]);

  const handleTableChange: TableProps<MemberListItemFragment>['onChange'] = (newPagination, filters, sorter) => {
    if (Object.values(filters).some((v) => v && v.length)) {
      setSearchText('');
      setFilterInfo(filters);
    } else {
      setFilterInfo({
        ...(searchText && { search: [searchText] }),
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
        <Button type="primary" size="large" icon={<Icon component={FaPlus} />} onClick={() => navigate('/members/new')}>
          {t('members.new')}
        </Button>
      </Flex>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
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

        <Col xs={24} sm={12} style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
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
          // getCheckboxProps: (record) => {
          //   if (selectedIds.length === 0) {
          //     return {
          //       disabled: false
          //     };
          //   }

          //   const member = members.find(({ id, courses }) => selectedIds.includes(id) && courses.length === 1)
          //   if (!member) {
          //     return {
          //       disabled: false
          //     };
          //   }

          //   const [course] = member.courses;
          //   const disabled = !record.courses.map(({id}) => id).includes(course.id)
          //   return {
          //     disabled
          //   }
          // },
          onChange: (selectedRowKeys) => setSelectedIds(selectedRowKeys as string[]),
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
          onCancel={() => {
            setMemberInfo(undefined);
            setNewAttendance(false);
          }}
        />
      )}
    </Space>
  );
};

export default MemberListPage;
