import React from 'react';
import { Alert, AlertProps, Descriptions, DescriptionsProps, Flex, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { differenceInCalendarDays, format, isSameMonth, isSameYear } from 'date-fns';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { MemberListItemFragment } from '../../../gql/graphql';
import { getMonths } from '../../../utils';
import { SettingsContext, SocialYearContext } from '../../../contexts';

interface Props {
  member: MemberListItemFragment;
}

const MemberExpandable: React.FC<Props> = ({ member }) => {
  const { socialYear } = React.useContext(SocialYearContext);
  const { settings } = React.useContext(SettingsContext);
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const payments = React.useMemo(() => member.currentEnrollment?.payments ?? [], [member.currentEnrollment?.payments]);
  const attendances = React.useMemo(
    () => member.currentEnrollment?.attendances ?? [],
    [member.currentEnrollment?.attendances]
  );
  const courses = React.useMemo(() => member.currentEnrollment?.courses ?? [], [member.currentEnrollment?.courses]);
  const medicalCertificateExpireAt = member.currentEnrollment?.medicalCertificateExpireAt;

  const isCurrentEnrollmentPaid = React.useMemo(() => {
    const result = payments.some(({ month }) => !month);
    return result;
  }, [payments]);

  const isMedicalCertificateExpiring = React.useMemo((): { text: string; type: AlertProps['type'] } | undefined => {
    if (!medicalCertificateExpireAt) {
      return {
        text: t('members.alerts.medicalCertificate.empty'),
        type: 'error',
      };
    }

    const differenceDays = differenceInCalendarDays(medicalCertificateExpireAt, Date.now());
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
        text: t('members.alerts.medicalCertificate.expired'),
        type: 'error',
      };
    }

    if (differenceDays <= minExpirationDays) {
      return {
        text: t('members.alerts.medicalCertificate.expiring', { days: differenceDays }),
        type: 'error',
      };
    }

    if (differenceDays <= maxExpirationDays) {
      return {
        text: t('members.alerts.medicalCertificate.expiring', { days: differenceDays }),
        type: 'warning',
      };
    }

    return undefined;
  }, [medicalCertificateExpireAt, settings, t]);

  const months = React.useMemo(() => getMonths(socialYear), [socialYear]);

  const getDescriptionItems = React.useCallback(
    (courseId: string) => {
      const mapFn = (month: Date): { month: Date; paid?: boolean; attendancesCount: number } => {
        const attendancesCount = attendances.filter(
          ({ from, course }) => isSameYear(from, month) && isSameMonth(from, month) && course.id === courseId
        ).length;

        return {
          month,
          paid:
            payments.some(({ month: paymentMonth }) => format(month, 'yyyy-MM') === paymentMonth) ||
            (attendancesCount >= (settings?.attendancesPerMonthToSendReminder || 0) ? false : undefined),
          attendancesCount,
        };
      };

      const monthItems = months.map((month) => mapFn(month));

      const result: DescriptionsProps['items'] = monthItems.map(({ month, paid, attendancesCount }) => {
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
      attendances,
      months,
      payments,
      settings?.attendancesPerMonthToSendReminder,
      t,
      token.colorError,
      token.colorPrimary,
      token.colorSuccess,
    ]
  );

  return (
    <Flex vertical gap="middle">
      {attendances.length > 0 && !isCurrentEnrollmentPaid && (
        <Alert title={t('members.alerts.currentEnrollmentNotPaid')} type="error" showIcon />
      )}
      {isMedicalCertificateExpiring && (
        <Alert title={isMedicalCertificateExpiring.text} type={isMedicalCertificateExpiring.type} showIcon />
      )}
      {courses.map(({ id: courseId, name }) => (
        <React.Fragment key={courseId}>
          {courses.length > 1 && name}
          <Descriptions items={getDescriptionItems(courseId)} bordered />
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default MemberExpandable;
