import React from 'react';
import { App, Form, FormProps, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { usePaymentSendReminderMutation } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';
import { CourseSearcher } from '../../courses/components';
import { dateToYearMonth } from '../../../utils/utils';
import { DatePicker } from '../../../components';

interface Props {
  memberId: string;
  courseIds: string[];
  onCancel: () => void;
}

const SendReminderModal: React.FC<Props> = ({ memberId, courseIds, onCancel }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const initialValues = {
    courseId: courseIds.length === 1 && courseIds[0],
    month: (() => {
      const today = new Date();
      return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    })(),
  };

  const [sendReminder, { loading: mutationLoading, error: mutationError }] = usePaymentSendReminderMutation({
    refetchQueries: ['Members', 'Emails'],
    onCompleted: () => {
      message.success(t('emails.sent'));
      onCancel();
    },
  });

  useDisplayGraphQLErrors(mutationError);

  const handleSubmit: FormProps['onFinish'] = (values) => {
    sendReminder({
      variables: {
        input: {
          memberId,
          ...values,
        },
      },
    });
  };

  return (
    <Modal
      title={t('emails.sendReminder')}
      open
      okButtonProps={{
        htmlType: 'submit',
        form: 'send-reminder-form',
        loading: mutationLoading,
      }}
      onCancel={onCancel}
      zIndex={9999}
    >
      <Form
        id="send-reminder-form"
        layout="vertical"
        autoComplete="off"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item
          label={t('emails.form.course')}
          name="courseId"
          rules={[{ required: true, message: t('validations.required') }]}
        >
          <CourseSearcher queryFilters={{ ids: courseIds }} allowClear={false} />
        </Form.Item>

        <Form.Item
          label={t('emails.form.month')}
          name="month"
          rules={[{ required: true, message: t('validations.required') }]}
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
          <DatePicker picker="month" allowClear={false} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendReminderModal;
