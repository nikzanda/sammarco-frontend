import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { addMonths, differenceInCalendarMonths, format } from 'date-fns';
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
        ({ counter, member, fee, fee: { course }, amount, date, month, years, type }) => ({
          counter,
          member: member.fullName,
          fee: fee.name,
          course: course.name,
          amount: toCurrency(amount),
          date: format(date, 'dd/MM/yyyy'),
          details: month ? capitalize(format(new Date(month), 'MMMM yyyy')) : years!.join(' - '),
          type: t(`payments.type.${type}`),
        })
      );
    }
    return undefined;
  }, [queryData, queryError, queryLoading, t]);

  const handleExport = () => {
    if (!monthRange) {
      return;
    }

    const months: string[] = [];
    const [dateFrom, dateTo] = monthRange;

    for (let i = 0; i < Math.abs(differenceInCalendarMonths(dateFrom, dateTo)) + 1; i++) {
      const current = addMonths(dateFrom, i);
      months.push(format(current, 'yyyy-MM'));
    }

    getPayments({
      variables: {
        filter: {
          period: months,
          sortBy: PaymentSortEnum.COUNTER,
          sortDirection: SortDirectionEnum.ASC,
        },
      },
    });
  };

  return (
    <Modal
      title={t('payments.export.title')}
      open
      onCancel={onCancel}
      okText={t('payments.export.button')}
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
      />

      {csvData && <CSVDownload data={csvData} headers={headers} filename={format(Date.now(), 'yyyy-MM-dd_HH:mm:ss')} />}
    </Modal>
  );
};

export default ExportPaymentsModal;
