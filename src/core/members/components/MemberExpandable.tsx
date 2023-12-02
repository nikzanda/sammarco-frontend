import React from 'react';
import { Alert, Descriptions, DescriptionsProps, Space, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { format, isSameMonth, isSameYear } from 'date-fns';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { MemberListItemFragment } from '../../../generated/graphql';
import { getYears } from '../../../utils/utils';

type Props = {
  member: MemberListItemFragment;
};

const MemberExpandable: React.FC<Props> = ({ member }) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const isCurrentEnrollemtPaid = React.useMemo(() => {
    const currentYears = getYears();
    const result = member.payments.some(
      ({ years }) => years && years[0] === currentYears[0] && years[1] === currentYears[1]
    );
    return result;
  }, [member.payments]);

  // TODO: se l'iscritto appartiene a più corsi
  const descriptionItems = React.useMemo(() => {
    const mapFn = (monthNumber: number, year: number): { month: Date; paid?: boolean; attendancesCount: number } => {
      const month = new Date(year, monthNumber, 1);
      const attendancesCount = member.attendances.filter(
        ({ from }) => isSameYear(from, month) && isSameMonth(from, month)
      ).length;

      return {
        month,
        paid:
          attendancesCount === 0
            ? undefined
            : member.payments.some(({ month: paymentMonth }) => format(month, 'yyyy-MM') === paymentMonth),
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
          <Space direction="vertical">
            <span>
              {t('members.table.expandable.paid')}: {icon}
            </span>
            <span>
              {t('members.table.expandable.attendances')}: <Typography.Text strong>{attendancesCount}</Typography.Text>
            </span>
          </Space>
        ),
      };
    });
    return result;
  }, [member.attendances, member.payments, t, token.colorError, token.colorPrimary, token.colorSuccess]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {member.attendances.length > 0 && !isCurrentEnrollemtPaid && (
        <Alert message={t('members.alerts.currentEnrollmentNotPaid')} type="error" showIcon />
      )}
      {/* TODO: alert / warning certificato medico */}
      <Descriptions items={descriptionItems} bordered />
    </Space>
  );
};

export default MemberExpandable;
