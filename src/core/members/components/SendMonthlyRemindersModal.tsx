import { App, Form, FormProps, Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dateToYearMonth } from '../../../utils';
import { DatePicker } from '../../../components';
import { useSendMonthlyRemindersMutation } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const FORM_ID = 'send-monthly-reminders-form';

interface Props {
  onCancel: () => void;
}

const SendMonthlyRemindersModal: React.FC<Props> = ({ onCancel }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [sendMonthlyReminders, { loading: mutationLoading, error: mutationError }] = useSendMonthlyRemindersMutation({
    refetchQueries: ['Members', 'Member', 'Emails'],
    onCompleted: ({ sendMonthlyReminders: { sentReminders } }) => {
      message.success(t('members.sentReminders', { sentReminders }));
      onCancel();
    },
  });

  useDisplayGraphQLErrors(mutationError);

  const handleFinish: FormProps['onFinish'] = (values) => {
    sendMonthlyReminders({
      variables: {
        input: values,
      },
    });
  };

  return (
    <Modal
      title={t('members.actions.sendReminders')}
      open
      onCancel={onCancel}
      okText={t('commons.send')}
      okButtonProps={{
        htmlType: 'submit',
        loading: mutationLoading,
        form: FORM_ID,
      }}
    >
      <Form
        id={FORM_ID}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish}
        initialValues={{
          month: (() => {
            const today = new Date();
            const result = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
            return result;
          })(),
        }}
      >
        <Form.Item
          label={t('payments.form.month')}
          name="month"
          rules={[{ required: true }]}
          getValueProps={(v: string) => {
            if (v) {
              const [year, month] = v.split('-');
              return { value: new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1) };
            }
            return { value: undefined };
          }}
          getValueFromEvent={(v: Date) => {
            if (v) {
              return dateToYearMonth(v);
            }
            return null;
          }}
        >
          <DatePicker picker="month" format="MMMM yyyy" allowClear={false} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendMonthlyRemindersModal;
