import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Flex, Space, Table, TableColumnsType, TableProps, Tooltip, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCalendarCheck, FaExclamationTriangle, FaFileCsv, FaSync } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { differenceInCalendarDays, format, isSameMonth, isSameYear, set } from 'date-fns';
import Highlighter from 'react-highlight-words';
import {
  MedicalCertificateExpirationEnum,
  MemberFilter,
  MemberListItemFragment,
  MemberSortEnum,
  SortDirectionEnum,
  useMembersQuery,
} from '../../generated/graphql';
import { PaymentCreateModal } from '../payments/components';
import { useDisplayGraphQLErrors } from '../../hooks';
import { ActionButtons, Filters, ListPageHeader, week } from '../../commons';
import { AttendanceCreateModal } from '../attendances/components';
import { getMonths, getRealCurrentYears, getYears } from '../../utils';
import { ExportMembersModal, MemberExpandable, SendMonthlyRemindersModal } from './components';
import { SendReminderModal } from '../emails/components';
import { useSyncMembers } from './hooks';
import { SettingsContext } from '../../contexts';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/member/';

const { REACT_APP_SOCIAL_YEAR } = process.env;
const showSync = parseInt(REACT_APP_SOCIAL_YEAR!, 10) < getRealCurrentYears()[0];

const MemberListPage: React.FC = () => {
  const { settings, validEmailSettings } = React.useContext(SettingsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const [memberInfo, setMemberInfo] = React.useState<{ memberId: string; courseIds: string[] }>();
  const [newPayment, setNewPayment] = React.useState(false);
  const [newAttendance, setNewAttendance] = React.useState(false);
  const [sendReminderData, setSendReminderData] = React.useState<{ memberId: string; courseIds: string[] }>();
  const [sendMonthlyReminders, setSendMonthlyReminders] = React.useState(false);
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
        sortBy = MemberSortEnum.SOCIAL_CARD_NUMBER;
    }

    const sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;

    const result: MemberFilter = {
      search: filterInfo.search?.length ? (filterInfo.search[0] as string).trim() : undefined,
      courseIds: filterInfo.courses?.length ? (filterInfo.courses as string[]) : undefined,
      shiftIds: filterInfo.shifts?.length ? (filterInfo.shifts as string[]) : undefined,
      unpaidRegistration: filterInfo.unpaidRegistration?.length
        ? filterInfo.unpaidRegistration[0] === 'true'
        : undefined,
      monthsNotPaid: filterInfo.monthsNotPaid?.length ? (filterInfo.monthsNotPaid as number[]) : undefined,
      medicalCertificateExpiration: filterInfo.medicalCertificateExpiration?.length
        ? (filterInfo.medicalCertificateExpiration as MedicalCertificateExpirationEnum[])
        : undefined,
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

  const { loading: syncLoading, sync: syncMembers } = useSyncMembers();

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
            ? differenceInCalendarDays(medicalCertificate.expireAt, Date.now())
            : 0;
          const maxExpirationDays =
            settings && settings.daysBeforeMedicalCertificateExpiresToSendEmail.length > 0
              ? Math.max(...settings.daysBeforeMedicalCertificateExpiresToSendEmail)
              : 30;
          const minExpirationDays =
            settings && settings.daysBeforeMedicalCertificateExpiresToSendEmail.length > 0
              ? Math.min(...settings.daysBeforeMedicalCertificateExpiresToSendEmail)
              : 10;
          if (!medicalCertificate || differenceDays <= maxExpirationDays) {
            showAlert = true;
            if (differenceDays > minExpirationDays) {
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
                const courseMonthAttendances = attendances.filter(
                  ({ from, course }) => isSameYear(from, month) && isSameMonth(from, month) && course.id === courseId
                );
                if (courseMonthAttendances.length >= (settings?.attendancesPerMonthToSendReminder || 0)) {
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
        render: (courses: MemberListItemFragment['courses']) => courses.map(({ name }) => name).join(', '),
      },
      {
        title: t('members.table.shifts'),
        key: 'shifts',
        dataIndex: 'courses',
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
            <Flex vertical>
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
            </Flex>
          );
        },
      },
      {
        key: 'actions',
        dataIndex: 'id',
        align: 'right',
        fixed: 'right',
        width: 180,
        render: (id: string, { courses, currentMonthReminderEmails }) => (
          <ActionButtons
            buttons={[
              'edit',
              'fee',
              'attendance',
              {
                button: 'reminder',
                sentRemindersCount: currentMonthReminderEmails.length,
                disabled: !validEmailSettings,
              },
            ]}
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
            onReminder={() => {
              setSendReminderData({
                memberId: id,
                courseIds: courses.map(({ id }) => id),
              });
            }}
          />
        ),
      },
    ];
    return result;
  }, [navigate, searchText, settings, t, token.colorError, token.colorWarning, validEmailSettings]);

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
      <ListPageHeader
        entity="members"
        actions={[
          {
            key: 'attendance',
            label: t('attendances.new'),
            icon: <Icon component={FaCalendarCheck} />,
            disabled: selectedIds.length === 0,
            onClick: () => setNewAttendance(true),
          },
          {
            key: 'export',
            label: t('commons.export.button'),
            icon: <Icon component={FaFileCsv} />,
            onClick: () => setExportCsv(true),
          },
          {
            key: 'send-reminders',
            label: t('members.actions.sendReminders'),
            icon: <Icon component={FaBell} />,
            onClick: () => setSendMonthlyReminders(true),
          },
          ...(showSync
            ? [
                {
                  key: 'sync',
                  label: t('buttons.sync.label'),
                  icon: <Icon component={FaSync} spin={syncLoading} />,
                  disabled: selectedIds.length === 0,
                  onClick: () =>
                    syncMembers(selectedIds).then((success) => {
                      if (success) {
                        setSelectedIds([]);
                      }
                    }),
                },
              ]
            : []),
        ]}
      />

      <Filters
        topFilters={[
          {
            key: 'courses',
            type: 'courses',
            props: {
              size: 'large',
              placeholder: t('members.form.courses'),
            },
          },
          {
            key: 'shifts',
            type: 'shift',
            props: {
              size: 'large',
              placeholder: t('members.form.shifts'),
              // ...(filterInfo.courses && filterInfo.courses.length > 0 && {
              //   queryFilters: {
              //     courseIds: filterInfo.courses as string[]
              //   }
              // })
            },
          },
        ]}
        collapsableFilters={[
          {
            key: 'unpaidRegistration',
            type: 'select',
            props: {
              size: 'large',
              placeholder: t('members.filterByUnpaidRegistration'),
              options: [
                {
                  label: t('members.registration.paid'),
                  value: 'true',
                },
                {
                  label: t('members.registration.unpaid'),
                  value: 'false',
                },
              ],
            },
          },
          {
            key: 'monthsNotPaid',
            type: 'month',
            props: {
              placeholder: t('members.filterByMonthsNotPaid'),
            },
          },
          {
            key: 'medicalCertificateExpiration',
            type: 'select',
            props: {
              size: 'large',
              placeholder: t('members.filterByMedicalCertificateExpiration'),
              options: Object.values(MedicalCertificateExpirationEnum).map((value) => ({
                label: t(`members.medicalCertificateExpiration.${value}`),
                value,
              })),
            },
          },
        ]}
        initialFilterInfo={filterInfo}
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={(newFilterInfo) => {
          setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
          setFilterInfo(newFilterInfo);
        }}
      />

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
            ...members.reduce((acc, { id: memberId, courses }) => {
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
      {sendReminderData && (
        <SendReminderModal
          memberId={sendReminderData.memberId}
          courseIds={sendReminderData.courseIds}
          onCancel={() => setSendReminderData(undefined)}
        />
      )}
      {exportCsv && <ExportMembersModal onCancel={() => setExportCsv(false)} />}
      {sendMonthlyReminders && <SendMonthlyRemindersModal onCancel={() => setSendMonthlyReminders(false)} />}
    </Space>
  );
};

export default MemberListPage;
