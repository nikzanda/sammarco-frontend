import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Flex, Table, TableColumnsType, TableProps, Tooltip, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCalendarCheck, FaFileCsv, FaIdCard, FaMoneyBillWave, FaNotesMedical } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { differenceInCalendarDays, format, isSameMonth, isSameYear, set } from 'date-fns';
import Highlighter from 'react-highlight-words';
import { useQuery } from '@apollo/client/react';
import {
  MedicalCertificateExpirationEnum,
  MemberFilter,
  MemberListItemFragment,
  MembersDocument,
  MemberSortEnum,
  SortDirectionEnum,
} from '../../gql/graphql';
import { PaymentCreateModal } from '../payments/components';
import { useDisplayGraphQLErrors } from '../../hooks';
import { ActionButtons, Filters, ListPageHeader, week } from '../../commons';
import { AttendanceCreateModal } from '../attendances/components';
import { getMonths } from '../../utils';
import { ExportMembersModal, MemberExpandable, SendMonthlyRemindersModal } from './components';
import { SendReminderModal } from '../emails/components';
import { SettingsContext, SocialYearContext } from '../../contexts';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/member/';

const MemberListPage: React.FC = () => {
  const { socialYear } = React.useContext(SocialYearContext);
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

      case 'socialCardNumber':
        sortBy = MemberSortEnum.SOCIAL_CARD_NUMBER;
        break;

      default:
        sortBy = MemberSortEnum.SOCIAL_CARD_NUMBER;
    }

    const sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;

    const showAllYears = filterInfo.showAllYears?.[0] === true;

    const result: MemberFilter = {
      socialYear: showAllYears ? undefined : socialYear,
      search: filterInfo.search?.length ? (filterInfo.search[0] as string).trim() : undefined,
      courseIds: filterInfo.courses?.length ? (filterInfo.courses as string[]) : undefined,
      shiftIds: filterInfo.shifts?.length ? (filterInfo.shifts as string[]) : undefined,
      excludeFromCommunications: filterInfo.excludeFromCommunications?.length
        ? filterInfo.excludeFromCommunications[0] === 'true'
        : undefined,
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
  }, [filterInfo, socialYear, sortInfo]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(MembersDocument, {
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

  const months = React.useMemo(() => getMonths(socialYear), [socialYear]);

  const columns = React.useMemo(() => {
    const result: TableColumnsType<MemberListItemFragment> = [
      {
        title: t('members.table.fullName'),
        key: 'fullName',
        dataIndex: 'fullName',
        sorter: true,
        width: 200,
        ellipsis: true,
        render: (fullName, { currentEnrollment }) => {
          const payments = currentEnrollment?.payments ?? [];
          const attendances = currentEnrollment?.attendances ?? [];
          const medicalCertificateExpireAt = currentEnrollment?.medicalCertificateExpireAt;

          // Medical certificate alert
          let showMedicalAlert = false;
          let medicalAlertColor = token.colorError;
          let medicalAlertTooltip = '';

          const differenceDays = medicalCertificateExpireAt
            ? differenceInCalendarDays(medicalCertificateExpireAt, Date.now())
            : 0;
          const maxExpirationDays =
            settings && settings.daysBeforeMedicalCertificateExpiresToSendEmail.length > 0
              ? Math.max(...settings.daysBeforeMedicalCertificateExpiresToSendEmail)
              : 30;
          const minExpirationDays =
            settings && settings.daysBeforeMedicalCertificateExpiresToSendEmail.length > 0
              ? Math.min(...settings.daysBeforeMedicalCertificateExpiresToSendEmail)
              : 10;
          if (!medicalCertificateExpireAt) {
            showMedicalAlert = true;
            medicalAlertTooltip = t('members.alerts.medicalCertificate.empty');
          } else if (differenceDays <= 0) {
            showMedicalAlert = true;
            medicalAlertTooltip = t('members.alerts.medicalCertificate.expired');
          } else if (differenceDays <= maxExpirationDays) {
            showMedicalAlert = true;
            if (differenceDays > minExpirationDays) {
              medicalAlertColor = token.colorWarning;
            }
            medicalAlertTooltip = t('members.alerts.medicalCertificate.expiring', { days: differenceDays });
          }

          // Unpaid registration alert
          const showUnpaidRegistration = attendances.length > 0 && !payments.some(({ month }) => !month);

          // Unpaid months alert
          const courses = currentEnrollment?.courses ?? [];
          const showMonthsNotPaid = months
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

          return (
            <>
              <Highlighter
                searchWords={[searchText]}
                textToHighlight={fullName}
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              />
              {showMedicalAlert && (
                <Tooltip title={medicalAlertTooltip}>
                  <Icon
                    component={FaNotesMedical}
                    style={{ color: medicalAlertColor, marginLeft: 4, verticalAlign: 'middle' }}
                  />
                </Tooltip>
              )}
              {showUnpaidRegistration && (
                <Tooltip title={t('members.alerts.currentEnrollmentNotPaid')}>
                  <Icon
                    component={FaIdCard}
                    style={{ color: token.colorError, marginLeft: 4, verticalAlign: 'middle' }}
                  />
                </Tooltip>
              )}
              {showMonthsNotPaid && (
                <Tooltip title={t('members.alerts.monthsNotPaid')}>
                  <Icon
                    component={FaMoneyBillWave}
                    style={{ color: token.colorError, marginLeft: 4, verticalAlign: 'middle' }}
                  />
                </Tooltip>
              )}
            </>
          );
        },
      },
      {
        title: t('members.table.courses'),
        key: 'courses',
        width: 150,
        ellipsis: true,
        render: (_, { currentEnrollment }) => currentEnrollment?.courses.map(({ name }) => name).join(', ') ?? '',
      },
      {
        title: t('members.table.shifts'),
        key: 'shifts',
        width: 200,
        render: (_, { currentEnrollment }) => {
          const courses = currentEnrollment?.courses ?? [];
          const shiftIds = currentEnrollment?.shiftIds ?? [];
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
        title: t('members.table.socialCardNumber'),
        key: 'socialCardNumber',
        align: 'center',
        sorter: true,
        width: 120,
        render: (_, { currentEnrollment }) => currentEnrollment?.socialCardNumber,
      },
      {
        key: 'actions',
        dataIndex: 'id',
        align: 'right',
        fixed: 'right',
        width: 180,
        render: (id: string, { currentEnrollment }) => {
          const courses = currentEnrollment?.courses ?? [];
          return (
            <ActionButtons
              buttons={[
                'edit',
                'fee',
                'attendance',
                {
                  button: 'reminder',
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
          );
        },
      },
    ];
    return result;
  }, [months, navigate, searchText, settings, t, token.colorError, token.colorWarning, validEmailSettings]);

  const handleTableChange: TableProps<MemberListItemFragment>['onChange'] = (newPagination, _filters, sorter) => {
    setSortInfo(sorter as SorterResult<MemberListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Flex vertical gap="middle">
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
            },
          },
        ]}
        collapsableFilters={[
          {
            key: 'showAllYears',
            type: 'switch',
            props: {
              placeholder: t('members.filters.showAllYears'),
            },
          },
          {
            key: 'excludeFromCommunications',
            type: 'select',
            props: {
              size: 'large',
              placeholder: t('members.filters.byExcludeFromCommunications.label'),
              options: [
                {
                  label: t('members.filters.byExcludeFromCommunications.options.true'),
                  value: 'true',
                },
                {
                  label: t('members.filters.byExcludeFromCommunications.options.false'),
                  value: 'false',
                },
              ],
            },
          },
          {
            key: 'unpaidRegistration',
            type: 'select',
            props: {
              size: 'large',
              placeholder: t('members.filters.byUnpaidRegistration.label'),
              options: [
                {
                  label: t('members.filters.byUnpaidRegistration.options.true'),
                  value: 'true',
                },
                {
                  label: t('members.filters.byUnpaidRegistration.options.false'),
                  value: 'false',
                },
              ],
            },
          },
          {
            key: 'monthsNotPaid',
            type: 'month',
            props: {
              placeholder: t('members.filters.byMonthsNotPaid'),
            },
          },
          {
            key: 'medicalCertificateExpiration',
            type: 'select',
            props: {
              size: 'large',
              placeholder: t('members.filters.byMedicalCertificateExpiration.label'),
              options: Object.values(MedicalCertificateExpirationEnum).map((value) => ({
                label: t(`members.filters.byMedicalCertificateExpiration.options.${value}`),
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
        size="small"
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
        onRow={(record) => ({
          style: !record.currentEnrollment ? { opacity: 0.5 } : undefined,
        })}
        rowSelection={{
          selections: [Table.SELECTION_NONE],
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedIds,
          onChange: (selectedRowKeys) => setSelectedIds(selectedRowKeys as string[]),
        }}
        expandable={{
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
            ...members.reduce((acc, { id: memberId, currentEnrollment }) => {
              if (!selectedIds.includes(memberId)) {
                return acc;
              }
              (currentEnrollment?.courses ?? []).forEach(({ id }) => {
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
    </Flex>
  );
};

export default MemberListPage;
