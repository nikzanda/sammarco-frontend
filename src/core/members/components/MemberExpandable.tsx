import React from 'react';
import { Alert, AlertProps, Descriptions, DescriptionsProps, Flex, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { differenceInCalendarDays, format, isSameMonth, isSameYear } from 'date-fns';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { MemberListItemFragment } from '../../../generated/graphql';
import { getYears } from '../../../utils';
import { SettingsContext } from '../../../contexts';

interface Props {
  member: MemberListItemFragment;
}

const MemberExpandable: React.FC<Props> = ({ member }) => {
  const { settings } = React.useContext(SettingsContext);
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const isCurrentEnrollmentPaid = React.useMemo(() => {
    const currentYears = getYears();
    const result = member.payments.some(
      ({ years }) => years && years[0] === currentYears[0] && years[1] === currentYears[1]
    );
    return result;
  }, [member.payments]);

  const isMedicalCertificateExpiring = React.useMemo((): AlertProps | undefined => {
    const { medicalCertificate } = member;
    if (!medicalCertificate) {
      return {
        message: t('members.alerts.medicalCertificate.empty'),
        type: 'error',
      };
    }

    const differenceDays = differenceInCalendarDays(medicalCertificate.expireAt, Date.now());
    const maxExpirationDays =
      settings && settings.daysBeforeMedicalCertificateExpiresToSendEmail.length > 0
        ? Math.max(...settings.daysBeforeMedicalCertificateExpiresToSendEmail)
        : 30;
    const minExpirationDays =
      settings && settings.daysBeforeMedicalCertificateExpiresToSendEmail.length > 0
        ? Math.min(...settings.daysBeforeMedicalCertificateExpiresToSendEmail)
        : 10;
    if (differenceDays <= 0) {
      return {
        message: t('members.alerts.medicalCertificate.expired'),
        type: 'error',
      };
    }

    if (differenceDays <= minExpirationDays) {
      return {
        message: t('members.alerts.medicalCertificate.expiring', { days: differenceDays }),
        type: 'error',
      };
    }

    if (differenceDays <= maxExpirationDays) {
      return {
        message: t('members.alerts.medicalCertificate.expiring', { days: differenceDays }),
        type: 'warning',
      };
    }

    return undefined;
  }, [member, settings, t]);

  const getDescriptionItems = React.useCallback(
    (courseId: string) => {
      const mapFn = (monthNumber: number, year: number): { month: Date; paid?: boolean; attendancesCount: number } => {
        const month = new Date(year, monthNumber, 1);
        const attendancesCount = member.attendances.filter(
          ({ from, course }) => isSameYear(from, month) && isSameMonth(from, month) && course.id === courseId
        ).length;

        return {
          month,
          paid:
            member.payments.some(({ month: paymentMonth }) => format(month, 'yyyy-MM') === paymentMonth) ||
            (attendancesCount >= (settings?.attendancesPerMonthToSendReminder || 0) ? false : undefined),
          attendancesCount,
        };
      };

      const months = getYears().reduce(
        (acc: { month: Date; paid?: boolean; attendancesCount: number }[], year, index) => {
          switch (index) {
            case 0:
              acc.push(...[8, 9, 10, 11].map((monthNumber) => mapFn(monthNumber, year)));
              break;

            case 1:
              acc.push(...[0, 1, 2, 3, 4, 5, 6, 7].map((monthNumber) => mapFn(monthNumber, year)));
              break;
          }

          return acc;
        },
        []
      );

      const result: DescriptionsProps['items'] = months.map(({ month, paid, attendancesCount }) => {
        let icon: React.ReactNode = '-';
        if (typeof paid === 'boolean') {
          icon = (
            <Icon
              component={paid ? FaCheckCircle : FaTimesCircle}
              style={{ color: paid ? token.colorSuccess : token.colorError }}
            />
          );
        }

        const isCurrentMonth = isSameMonth(Date.now(), month);

        return {
          key: month.valueOf(),
          label: format(month, 'MMMM yyyy'),
          labelStyle: {
            textTransform: 'capitalize',
            fontWeight: isCurrentMonth ? 'bold' : 'initial',
            ...(isCurrentMonth && { border: `1px solid ${token.colorPrimary}` }),
            ...(typeof paid === 'boolean' && !paid && { border: `1px solid ${token.colorError}` }),
          },
          children: (
            <Flex vertical>
              <span>
                {t('members.table.expandable.paid')}: {icon}
              </span>
              <span>
                {t('members.table.expandable.attendances')}:{' '}
                <Typography.Text strong>{attendancesCount}</Typography.Text>
              </span>
            </Flex>
          ),
        };
      });
      return result;
    },
    [
      member.attendances,
      member.payments,
      settings?.attendancesPerMonthToSendReminder,
      t,
      token.colorError,
      token.colorPrimary,
      token.colorSuccess,
    ]
  );

  return (
    <Flex vertical gap="middle">
      {member.attendances.length > 0 && !isCurrentEnrollmentPaid && (
        <Alert message={t('members.alerts.currentEnrollmentNotPaid')} type="error" showIcon />
      )}
      {isMedicalCertificateExpiring && (
        <Alert message={isMedicalCertificateExpiring.message} type={isMedicalCertificateExpiring.type} showIcon />
      )}
      {member.courses.map(({ id: courseId, name }) => (
        <React.Fragment key={courseId}>
          {member.courses.length > 1 && name}
          <Descriptions items={getDescriptionItems(courseId)} bordered />
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default MemberExpandable;
