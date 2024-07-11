import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { endOfDay, format, lastDayOfMonth, set, startOfDay } from 'date-fns';
import { CSVDownload } from 'react-csv';
import { PaymentSortEnum, SortDirectionEnum, usePaymentsCsvLazyQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';
import { DatePicker } from '../../../components';
import { capitalize, toCurrency } from '../../../utils/utils';

type Props = {
  onCancel: () => void;
};

const ExportPaymentsModal: React.FC<Props> = ({ onCancel }) => {
  const { t } = useTranslation();

  const headers = [
    { label: t('payments.csv.counter'), key: 'counter' },
    { label: t('payments.csv.member'), key: 'member' },
    { label: t('payments.csv.fee'), key: 'fee' },
    { label: t('payments.csv.course'), key: 'course' },
    { label: t('payments.csv.amount'), key: 'amount' },
    { label: t('payments.csv.date'), key: 'date' },
    { label: t('payments.csv.details'), key: 'details' },
    { label: t('payments.csv.type'), key: 'type' },
  ];

  const [monthRange, setMonthRange] = React.useState<[Date, Date]>();

  const [getPayments, { data: queryData, loading: queryLoading, error: queryError }] = usePaymentsCsvLazyQuery();

  useDisplayGraphQLErrors(queryError);

  const csvData = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.payments.data.map(
        ({ counter, member, fee, fee: { course }, amount, date, month, years, type }) => {
          let details = '';
          if (month) {
            details = capitalize(format(new Date(month), 'MMMM yyyy'));
          }

          if (years) {
            details = years.join(' - ');
          }

          return {
            counter,
            member: member.fullName,
            fee: fee.name,
            course: course.name,
            amount: toCurrency(amount),
            date: format(date, 'dd/MM/yyyy'),
            details,
            type: t(`payments.type.${type}`),
          };
        }
      );
    }
    return undefined;
  }, [queryData, queryError, queryLoading, t]);

  const handleExport = () => {
    if (!monthRange) {
      return;
    }

    const [dateFrom, dateTo] = monthRange;

    getPayments({
      variables: {
        filter: {
          dateFrom: startOfDay(set(dateFrom, { date: 1 })).getTime(),
          dateTo: endOfDay(lastDayOfMonth(dateTo)).getTime(),
          sortBy: PaymentSortEnum.COUNTER,
          sortDirection: SortDirectionEnum.ASC,
        },
      },
    });
  };

  return (
    <Modal
      title={t('commons.export.title')}
      open
      onCancel={onCancel}
      okText={t('commons.export.button')}
      okButtonProps={{
        loading: queryLoading,
        disabled: !monthRange,
        onClick: handleExport,
      }}
    >
      <DatePicker.RangePicker
        value={monthRange}
        picker="month"
        style={{ width: '100%' }}
        onChange={(values) => setMonthRange(values as any)}
        inputReadOnly
      />

      {csvData && <CSVDownload data={csvData} headers={headers} filename={format(Date.now(), 'yyyy-MM-dd_HH:mm:ss')} />}
    </Modal>
  );
};

export default ExportPaymentsModal;
