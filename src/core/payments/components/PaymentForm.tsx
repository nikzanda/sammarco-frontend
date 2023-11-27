import React from 'react';
import { Col, Form, Input, InputNumber, Radio, Row } from 'antd';
import { FormInstance } from 'antd/es/form';
import { format, set } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { PaymentTypeEnum, RecurrenceEnum, PaymentDetailFragment, FeeSearcherQuery } from '../../../generated/graphql';
import { dateToYearMonth } from '../../../utils/utils';
import { DatePicker } from '../../../components';
import { FeeSearcher } from '../../fees/components';
import { MemberSearcher } from '../../members/components';

const defaultProps = {
  payment: undefined,
};

type Props = {
  form: FormInstance<any>;
  payment?: PaymentDetailFragment;
};

const PaymentForm: React.FC<Props> = ({ form, payment }) => {
  const { t } = useTranslation();

  const paymentReason = React.useRef<string>(payment?.fee.reason || '');
  const [fee, setFee] = React.useState<FeeSearcherQuery['fee'] | undefined>(payment?.fee);

  const paymentTypeOptions = React.useMemo(() => {
    const result = Object.keys(PaymentTypeEnum).map((paymentType) => ({
      label: t(`payments.type.${paymentType}`),
      value: paymentType,
    }));
    return result;
  }, [t]);

  return (
    <Row gutter={24}>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('payments.form.member')}
          name="memberId"
          rules={[{ required: true, message: t('validations.required') }]}
        >
          <MemberSearcher allowClear={false} />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('payments.form.fee')}
          name="feeId"
          rules={[{ required: true, message: t('validations.required') }]}
        >
          <FeeSearcher
            // queryFilters={{ courseIds: [] }}
            allowClear={false}
            onChange={(_value, selectedFee) => {
              if (selectedFee) {
                setFee(selectedFee);
                form.setFieldValue('amount', selectedFee.amount);

                const today = new Date();
                const years = [
                  today.getMonth() < 8 ? today.getFullYear() - 1 : today.getFullYear(),
                  today.getMonth() < 8 ? today.getFullYear() : today.getFullYear() + 1,
                ];

                let { reason } = selectedFee;
                paymentReason.current = reason;
                reason = reason.replaceAll('[MESE]', format(Date.now(), 'MMMM yyyy'));
                reason = reason.replaceAll('[ANNO]', years.join(' - '));
                form.setFieldValue('reason', reason);
              }
            }}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item noStyle dependencies={['feeId']}>
          {({ getFieldValue }) => {
            const feeId = getFieldValue('feeId');
            if (!feeId || !fee) {
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
                      return dateToYearMonth(v);
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
                        const years = [
                          date.getMonth() < 8 ? date.getFullYear() - 1 : date.getFullYear(),
                          date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1,
                        ];

                        let reason = paymentReason.current!;
                        reason = reason.replaceAll('[MESE]', format(date, 'MMMM yyyy'));
                        reason = reason.replaceAll('[ANNO]', years.join(' - '));
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
      </Col>

      <Col xs={24} md={12}>
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
      </Col>

      <Col xs={24} md={12}>
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
      </Col>

      <Col xs={24} md={12}>
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
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('payments.form.paymentType')}
          name="type"
          rules={[{ required: true, message: t('validations.required') }]}
        >
          <Radio.Group options={paymentTypeOptions} />
        </Form.Item>
      </Col>
    </Row>
  );
};

PaymentForm.defaultProps = defaultProps;

export default PaymentForm;
