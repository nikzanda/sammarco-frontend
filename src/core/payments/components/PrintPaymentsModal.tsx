import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { endOfMonth, startOfMonth } from 'date-fns';
import { DatePicker } from '../../../components';
import PDF from '../pdfs/receipt-pdf';

type Props = {
  onCancel: () => void;
};

const PrintPaymentsModal: React.FC<Props> = ({ onCancel }) => {
  const { t } = useTranslation();

  const [monthRange, setMonthRange] = React.useState<[Date, Date]>();

  const handlePrint = () => {
    if (!monthRange) {
      return;
    }

    const [createdAtFrom, createdAtTo] = monthRange.map((d) => d.getTime());

    PDF.printMultiple({
      createdAtFrom: startOfMonth(createdAtFrom).getTime(),
      createdAtTo: endOfMonth(createdAtTo).getTime(),
    });
  };

  return (
    <Modal
      title={t('buttons.print.label')}
      open
      onCancel={onCancel}
      okText={t('buttons.print.label')}
      okButtonProps={{
        disabled: !monthRange,
        onClick: handlePrint,
      }}
    >
      <DatePicker.RangePicker
        value={monthRange}
        picker="month"
        style={{ width: '100%' }}
        onChange={(values) => setMonthRange(values as any)}
        inputReadOnly
      />
    </Modal>
  );
};

export default PrintPaymentsModal;
