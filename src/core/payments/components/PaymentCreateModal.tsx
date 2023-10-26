import React, { useRef } from 'react';
import { App, Form, Input, InputNumber, Modal, Radio, Select } from 'antd';
import { format, set } from 'date-fns';
import { useTranslation } from 'react-i18next';
import {
  PaymentTypeEnum,
  RecurrenceEnum,
  useFeesSearcherQuery,
  usePaymentCreateMutation,
} from '../../../generated/graphql';
import { DatePicker } from '../../../components';
import { useDisplayGraphQLErrors } from '../../../hooks';

type Props = {
  memberId: string;
  courseIds: string[];
  onCancel: () => void;
};

const initialValues = {
  date: Date.now(),
  month: [new Date().getFullYear(), (new Date().getMonth() + 1).toString().padStart(2, '0')].join('-'),
  years: [new Date().getFullYear(), new Date().getFullYear() + 1],
  type: PaymentTypeEnum.CASH,
};

const PaymentCreateModal: React.FC<Props> = ({ memberId, courseIds, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { message } = App.useApp();

  const paymentReason = useRef<string>();

  const {
    data: feesData,
    loading: feesLoading,
    error: feesError,
  } = useFeesSearcherQuery({
    variables: {
      filter: {
        courseIds,
      },
    },
  });

  const fees = React.useMemo(() => {
    if (!feesLoading && !feesError && feesData) {
      return feesData.fees.data;
    }
    return [];
  }, [feesData, feesError, feesLoading]);

  const paymentTypeOptions = React.useMemo(() => {
    const result = Object.keys(PaymentTypeEnum).map((paymentType) => ({
      label: t(`payments.type.${paymentType}`),
      value: paymentType,
    }));
    return result;
  }, [t]);

  const [createPayment, { loading: mutationLoading, error: mutationError }] = usePaymentCreateMutation({
    refetchQueries: ['Payments'],
    onCompleted: () => {
      message.success(t('members.payments.created'));
      onCancel();
    },
  });

  useDisplayGraphQLErrors([mutationError, feesError]);

  const handleSubmit = (values: any) => {
    createPayment({
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
      title={t('payments.new')}
      open
      okButtonProps={{
        htmlType: 'submit',
        form: 'form',
        loading: mutationLoading,
      }}
      onCancel={onCancel}
    >
      <Form
        id="form"
        form={form}
        initialValues={initialValues}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label={t('payments.form.fee')}
          name="feeId"
          rules={[{ required: true, message: t('validations.required') }]}
        >
          {/* TODO: fee searcher */}
          <Select
            options={fees.map((fee) => ({ label: fee.name, value: fee.id }))}
            loading={feesLoading}
            allowClear={false}
            onChange={(value) => {
              const fee = fees.find(({ id }) => id === value);
              if (fee) {
                form.setFieldValue('amount', fee.amount);

                let { reason } = fee;
                paymentReason.current = reason;
                reason = reason.replaceAll('[MESE]', format(Date.now(), 'MMMM yyyy'));
                // TODO: reason.replaceAll years
                form.setFieldValue('reason', reason);
              }
            }}
          />
        </Form.Item>

        <Form.Item noStyle dependencies={['feeId']}>
          {({ getFieldValue }) => {
            const feeId = getFieldValue('feeId');
            if (!feeId) {
              return undefined;
            }

            const fee = fees.find(({ id }) => id === feeId);
            if (!fee) {
              return undefined;
            }

            if (fee.recurrence && [RecurrenceEnum.MONTHLY].includes(fee.recurrence)) {
              return (
                <Form.Item
                  label={t('payments.form.month')}
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
                      return [v.getFullYear(), (v.getMonth() + 1).toString().padStart(2, '0')].join('-');
                    }
                    return null;
                  }}
                >
                  <DatePicker
                    picker="month"
                    allowClear={false}
                    style={{ width: '100%' }}
                    onChange={(date) => {
                      if (date) {
                        let reason = paymentReason.current!;
                        reason = reason.replaceAll('[MESE]', format(date, 'MMMM yyyy'));
                        // TODO: reason.replaceAll years
                        form.setFieldValue('reason', reason);
                      }
                    }}
                  />
                </Form.Item>
              );
            }

            if (fee.recurrence && [RecurrenceEnum.ANNUAL].includes(fee.recurrence)) {
              return (
                <Form.Item
                  label={t('payments.form.years')}
                  name="years"
                  rules={[{ required: true, message: t('validations.required') }]}
                  getValueProps={(v: [number, number]) => {
                    if (v) {
                      const [yearFrom, yearTo] = v;
                      const now = Date.now();
                      return { value: [set(now, { year: yearFrom }), set(now, { year: yearTo })] };
                    }
                    return { value: undefined };
                  }}
                  getValueFromEvent={(v: [Date, Date]) => {
                    if (v) {
                      const [dateFrom, dateTo] = v;
                      return [dateFrom.getFullYear(), dateTo.getFullYear()];
                    }
                    return null;
                  }}
                >
                  <DatePicker.RangePicker picker="year" allowClear={false} style={{ width: '100%' }} />
                </Form.Item>
              );
            }

            return undefined;
          }}
        </Form.Item>

        <Form.Item noStyle dependencies={['feeId']}>
          {({ getFieldValue }) => {
            const feeId = getFieldValue('feeId');

            return (
              <Form.Item
                label={t('payments.form.amount')}
                name="amount"
                rules={[{ required: true, message: t('validations.required') }]}
              >
                <InputNumber
                  min={0}
                  step={1}
                  precision={2}
                  decimalSeparator=","
                  disabled={!feeId}
                  addonAfter="€"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            );
          }}
        </Form.Item>

        <Form.Item
          label={t('payments.form.date')}
          name="date"
          rules={[{ required: true, message: t('validations.required') }]}
          getValueProps={(v: number) => {
            if (v) {
              return { value: new Date(v) };
            }
            return { value: undefined };
          }}
          getValueFromEvent={(v: Date) => {
            if (v) {
              return v.getTime();
            }
            return null;
          }}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item noStyle dependencies={['feeId']}>
          {({ getFieldValue }) => {
            const feeId = getFieldValue('feeId');

            return (
              <Form.Item
                label={t('payments.form.reason')}
                name="reason"
                rules={[{ required: true, message: t('validations.required') }]}
              >
                <Input.TextArea disabled={!feeId} />
              </Form.Item>
            );
          }}
        </Form.Item>

        <Form.Item
          label={t('payments.form.paymentType')}
          name="type"
          rules={[{ required: true, message: t('validations.required') }]}
        >
          <Radio.Group options={paymentTypeOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PaymentCreateModal;
