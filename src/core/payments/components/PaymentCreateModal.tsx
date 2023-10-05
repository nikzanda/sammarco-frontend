import React from 'react';
import { App, Form, InputNumber, Modal, Radio, Select } from 'antd';
import { set } from 'date-fns';
import { useTranslation } from 'react-i18next';
import {
  FeeTypeEnum,
  PaymentTypeEnum,
  useFeesSearcherQuery,
  usePaymentCreateMutation,
} from '../../../generated/graphql';
import { DatePicker } from '../../../components';
import { useDisplayGraphQLErrors } from '../../../hooks';

type Props = {
  memberId: string;
  onCancel: () => void;
};

const initialValues = {
  date: Date.now(),
  month: [new Date().getFullYear(), (new Date().getMonth() + 1).toString().padStart(2, '0')].join('-'),
  years: [new Date().getFullYear(), new Date().getFullYear() + 1],
  type: PaymentTypeEnum.CASH,
};

const PaymentCreateModal: React.FC<Props> = ({ memberId, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { message } = App.useApp();

  // TODO: fare un componente
  const {
    data: feesData,
    loading: feesLoading,
    error: feesError,
  } = useFeesSearcherQuery({
    variables: {
      filter: {},
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
      label: paymentType,
      value: paymentType,
    }));
    return result;
  }, []);

  const [createPayment, { loading: mutationLoading, error: mutationError }] = usePaymentCreateMutation({
    onCompleted: () => {
      message.success(t('messages.success'));
      onCancel();
    },
  });

  useDisplayGraphQLErrors([mutationError]);

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
      title="pagamento"
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
          label="fee"
          name="feeId"
          rules={[{ required: true, message: 'validations.required' }]} // TODO: translate
        >
          <Select
            options={fees.map((fee) => ({ label: fee.name, value: fee.id }))}
            loading={feesLoading}
            allowClear={false}
            onChange={(value) => {
              const fee = fees.find(({ id }) => id === value);
              if (fee) {
                form.setFieldValue('amount', fee.amount);
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
            if (!fee || !fee.type) {
              return undefined;
            }

            if ([FeeTypeEnum.FULL_MONTH, FeeTypeEnum.PARTIAL_MONTH].includes(fee.type)) {
              return (
                <Form.Item
                  label="month"
                  name="month"
                  rules={[{ required: true, message: 'validations.required' }]} // TODO: translate
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
                  <DatePicker picker="month" allowClear={false} style={{ width: '100%' }} />
                </Form.Item>
              );
            }

            if ([FeeTypeEnum.ENROLLMENT_A, FeeTypeEnum.ENROLLMENT_B, FeeTypeEnum.ENROLLMENT_C].includes(fee.type)) {
              return (
                <Form.Item
                  label="years"
                  name="years"
                  rules={[{ required: true, message: 'validations.required' }]} // TODO: translate
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
                label="amount"
                name="amount"
                rules={[{ required: true, message: 'validations.required' }]} // TODO: translate
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
          label="date"
          name="date"
          rules={[{ required: true, message: 'validations.required' }]} // TODO: translate
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

        <Form.Item
          label="paymentType"
          name="type"
          rules={[{ required: true, message: 'validations.required' }]} // TODO: translate
        >
          <Radio.Group options={paymentTypeOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PaymentCreateModal;
