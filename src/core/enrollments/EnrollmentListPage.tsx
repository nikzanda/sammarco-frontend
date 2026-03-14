import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Badge, Flex, Table, TableColumnsType, TableProps, Tooltip, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  FaBell,
  FaCalendarCheck,
  FaCheckCircle,
  FaFileCsv,
  FaIdCard,
  FaMoneyBillWave,
  FaNotesMedical,
} from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { differenceInCalendarDays, format, isSameMonth, isSameYear, set } from 'date-fns';
import Highlighter from 'react-highlight-words';
import { useQuery } from '@apollo/client/react';
import {
  EnrollmentFilter,
  EnrollmentListItemFragment,
  EnrollmentSortEnum,
  EnrollmentStatusEnum,
  EnrollmentsDocument,
  MedicalCertificateExpirationEnum,
  SortDirectionEnum,
} from '../../gql/graphql';
import { PaymentCreateModal } from '../payments/components';
import { useDisplayGraphQLErrors } from '../../hooks';
import { ActionButtons, Filters, ListPageHeader, week } from '../../commons';
import { AttendanceCreateModal } from '../attendances/components';
import { getMonths } from '../../utils';
import { MemberExpandable, SendMonthlyRemindersModal } from '../members/components';
import { SendReminderModal } from '../emails/components';
import { SettingsContext, SocialYearContext } from '../../contexts';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/enrollment/';

const EnrollmentListPage: React.FC = () => {
  const { socialYear } = React.useContext(SocialYearContext);
  const { settings, validEmailSettings } = React.useContext(SettingsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const [enrollmentInfo, setEnrollmentInfo] = React.useState<{ memberId: string; courseIds: string[] }>();
  const [newPayment, setNewPayment] = React.useState(false);
  const [newAttendance, setNewAttendance] = React.useState(false);
  const [sendReminderData, setSendReminderData] = React.useState<{ memberId: string; courseIds: string[] }>();
  const [sendMonthlyReminders, setSendMonthlyReminders] = React.useState(false);

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
  const [sortInfo, setSortInfo] = useLocalStorageState<SorterResult<EnrollmentListItemFragment>>(
    `${LOCAL_STORAGE_PATH}sortInfo`,
    { defaultValue: { columnKey: 'socialCardNumber', order: 'descend' } }
  );

  const queryFilter = React.useMemo(() => {
    let sortBy: EnrollmentSortEnum;

    switch (sortInfo.columnKey) {
      case 'fullName':
        sortBy = EnrollmentSortEnum.MEMBER_NAME;
        break;

      case 'socialCardNumber':
        sortBy = EnrollmentSortEnum.SOCIAL_CARD_NUMBER;
        break;

      case 'status':
        sortBy = EnrollmentSortEnum.STATUS;
        break;

      case 'qualification':
        sortBy = EnrollmentSortEnum.QUALIFICATION;
        break;

      default:
        sortBy = EnrollmentSortEnum.SOCIAL_CARD_NUMBER;
    }

    const sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;

    const result: EnrollmentFilter = {
      socialYear: filterInfo.socialYear?.length ? (filterInfo.socialYear[0] as number) : socialYear,
      search: filterInfo.search?.length ? (filterInfo.search[0] as string).trim() : undefined,
      courseIds: filterInfo.courses?.length ? (filterInfo.courses as string[]) : undefined,
      shiftIds: filterInfo.shifts?.length ? (filterInfo.shifts as string[]) : undefined,
      status: filterInfo.status?.length ? (filterInfo.status[0] as EnrollmentStatusEnum) : undefined,
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
  } = useQuery(EnrollmentsDocument, {
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      filter: queryFilter,
    },
  });

  useDisplayGraphQLErrors(queryError);

  const enrollments = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.enrollments.data;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const total = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.enrollments.pageInfo.total;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const months = React.useMemo(() => getMonths(socialYear), [socialYear]);

  const columns = React.useMemo(() => {
    const result: TableColumnsType<EnrollmentListItemFragment> = [
      {
        title: t('enrollments.table.fullName'),
        key: 'fullName',
        sorter: true,
        width: 200,
        ellipsis: true,
        render: (_, { member, payments, attendances, medicalCertificateExpireAt, courses }) => {
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
            medicalAlertTooltip = t('enrollments.alerts.medicalCertificate.empty');
          } else if (differenceDays <= 0) {
            showMedicalAlert = true;
            medicalAlertTooltip = t('enrollments.alerts.medicalCertificate.expired');
          } else if (differenceDays <= maxExpirationDays) {
            showMedicalAlert = true;
            if (differenceDays > minExpirationDays) {
              medicalAlertColor = token.colorWarning;
            }
            medicalAlertTooltip = t('enrollments.alerts.medicalCertificate.expiring', { days: differenceDays });
          }

          // Unpaid registration alert
          const showUnpaidRegistration = attendances.length > 0 && !payments.some(({ month }) => !month);

          // Unpaid months alert
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
                textToHighlight={member.fullName}
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
                <Tooltip title={t('enrollments.alerts.currentEnrollmentNotPaid')}>
                  <Icon
                    component={FaIdCard}
                    style={{ color: token.colorError, marginLeft: 4, verticalAlign: 'middle' }}
                  />
                </Tooltip>
              )}
              {showMonthsNotPaid && (
                <Tooltip title={t('enrollments.alerts.monthsNotPaid')}>
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
        title: t('enrollments.table.courses'),
        key: 'courses',
        width: 150,
        ellipsis: true,
        render: (_, { courses }) => courses.map(({ name }) => name).join(', '),
      },
      {
        title: t('enrollments.table.shifts'),
        key: 'shifts',
        width: 200,
        render: (_, { courses, shiftIds }) => {
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
        title: t('enrollments.table.socialCardNumber'),
        key: 'socialCardNumber',
        dataIndex: 'socialCardNumber',
        align: 'center',
        sorter: true,
        defaultSortOrder: 'descend',
        width: 120,
      },
      {
        title: t('enrollments.table.status'),
        key: 'status',
        dataIndex: 'status',
        align: 'center',
        sorter: true,
        width: 120,
        render: (status: EnrollmentStatusEnum) => (
          <Badge
            status={status === EnrollmentStatusEnum.CONFIRMED ? 'success' : 'warning'}
            text={t(`enrollments.status.${status}`)}
          />
        ),
      },
      {
        key: 'actions',
        align: 'right',
        fixed: 'right',
        width: 180,
        render: (_, { id, member, courses }) => (
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
            onEdit={() => navigate(`/enrollments/${id}`)}
            onFee={() => {
              setEnrollmentInfo({
                memberId: member.id,
                courseIds: courses.map((course) => course.id),
              });
              setNewPayment(true);
            }}
            onAttendance={() => {
              setEnrollmentInfo({
                memberId: member.id,
                courseIds: courses.map((course) => course.id),
              });
              setNewAttendance(true);
            }}
            onReminder={() => {
              setSendReminderData({
                memberId: member.id,
                courseIds: courses.map(({ id }) => id),
              });
            }}
          />
        ),
      },
    ];
    return result;
  }, [months, navigate, searchText, settings, t, token.colorError, token.colorWarning, validEmailSettings]);

  const handleTableChange: TableProps<EnrollmentListItemFragment>['onChange'] = (newPagination, _filters, sorter) => {
    setSortInfo(sorter as SorterResult<EnrollmentListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Flex vertical gap="middle">
      <ListPageHeader
        entity="enrollments"
        actions={[
          {
            key: 'attendance',
            label: t('attendances.new'),
            icon: <Icon component={FaCalendarCheck} />,
            disabled: selectedIds.length === 0,
            onClick: () => setNewAttendance(true),
          },
          {
            key: 'confirm',
            label: t('enrollments.actions.confirm'),
            icon: <Icon component={FaCheckCircle} />,
            disabled: selectedIds.length === 0,
          },
          {
            key: 'export',
            label: t('commons.export.button'),
            icon: <Icon component={FaFileCsv} />,
          },
          {
            key: 'send-reminders',
            label: t('enrollments.actions.sendReminders'),
            icon: <Icon component={FaBell} />,
            onClick: () => setSendMonthlyReminders(true),
          },
        ]}
      />

      <Filters
        topFilters={[
          {
            key: 'socialYear',
            type: 'socialYear',
          },
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
          {
            key: 'status',
            type: 'select',
            props: {
              size: 'large',
              placeholder: t('enrollments.filters.byStatus'),
              options: Object.values(EnrollmentStatusEnum).map((value) => ({
                label: t(`enrollments.status.${value}`),
                value,
              })),
            },
          },
        ]}
        collapsableFilters={[
          {
            key: 'excludeFromCommunications',
            type: 'select',
            props: {
              size: 'large',
              placeholder: t('enrollments.filters.byExcludeFromCommunications.label'),
              options: [
                {
                  label: t('enrollments.filters.byExcludeFromCommunications.options.true'),
                  value: 'true',
                },
                {
                  label: t('enrollments.filters.byExcludeFromCommunications.options.false'),
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
              placeholder: t('enrollments.filters.byUnpaidRegistration.label'),
              options: [
                {
                  label: t('enrollments.filters.byUnpaidRegistration.options.true'),
                  value: 'true',
                },
                {
                  label: t('enrollments.filters.byUnpaidRegistration.options.false'),
                  value: 'false',
                },
              ],
            },
          },
          {
            key: 'monthsNotPaid',
            type: 'month',
            props: {
              placeholder: t('enrollments.filters.byMonthsNotPaid'),
            },
          },
          {
            key: 'medicalCertificateExpiration',
            type: 'select',
            props: {
              size: 'large',
              placeholder: t('enrollments.filters.byMedicalCertificateExpiration.label'),
              options: Object.values(MedicalCertificateExpirationEnum).map((value) => ({
                label: t(`enrollments.filters.byMedicalCertificateExpiration.options.${value}`),
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
        dataSource={enrollments}
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
            const end =
              start + (enrollments.length < pagination.pageSize ? enrollments.length : pagination.pageSize) - 1;
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
          expandedRowRender: (enrollment) => (
            <MemberExpandable member={{ ...enrollment.member, currentEnrollment: enrollment } as never} />
          ),
        }}
        scroll={{ x: 600 }}
      />
      {newPayment && enrollmentInfo && (
        <PaymentCreateModal
          memberId={enrollmentInfo.memberId}
          courseIds={enrollmentInfo.courseIds}
          onCancel={() => {
            setEnrollmentInfo(undefined);
            setNewPayment(false);
          }}
        />
      )}
      {newAttendance && enrollmentInfo && (
        <AttendanceCreateModal
          memberIds={[enrollmentInfo.memberId]}
          courseIds={enrollmentInfo.courseIds}
          onCancel={() => {
            setEnrollmentInfo(undefined);
            setNewAttendance(false);
          }}
        />
      )}
      {newAttendance && selectedIds.length > 0 && (
        <AttendanceCreateModal
          memberIds={[
            ...enrollments.reduce((acc, { id, member }) => {
              if (selectedIds.includes(id)) {
                acc.add(member.id);
              }
              return acc;
            }, new Set<string>()),
          ]}
          courseIds={[
            ...enrollments.reduce((acc, { id, courses }) => {
              if (!selectedIds.includes(id)) {
                return acc;
              }
              courses.forEach(({ id }) => {
                acc.add(id);
              });
              return acc;
            }, new Set<string>()),
          ]}
          onCancel={(success) => {
            setEnrollmentInfo(undefined);
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
      {sendMonthlyReminders && <SendMonthlyRemindersModal onCancel={() => setSendMonthlyReminders(false)} />}
    </Flex>
  );
};

export default EnrollmentListPage;
