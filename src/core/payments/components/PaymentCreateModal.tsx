import React from 'react';
import { App, Checkbox, Form, FormProps, Input, InputNumber, Modal, Radio, Spin } from 'antd';
import { format, set } from 'date-fns';
import { useTranslation } from 'react-i18next';
import {
  FeeSearcherQuery,
  FeeSortEnum,
  PaymentTypeEnum,
  RecurrenceEnum,
  SortDirectionEnum,
  useMemberSearcherLazyQuery,
  usePaymentCreateMutation,
  usePaymentSendReceiptMutation,
} from '../../../generated/graphql';
import { DatePicker } from '../../../components';
import { useDisplayGraphQLErrors } from '../../../hooks';
import { dateToYearMonth, getYears } from '../../../utils';
import PDF from '../pdfs/receipt-pdf';
import { FeeSearcher } from '../../fees/components';
import { SettingsContext } from '../../../contexts';

interface Props {
  memberId: string;
  courseIds: string[];
  onCancel: () => void;
}

const initialValues = {
  date: Date.now(),
  month: [new Date().getFullYear(), (new Date().getMonth() + 1).toString().padStart(2, '0')].join('-'),
  years: getYears(),
  type: PaymentTypeEnum.CASH,
  sendEmail: true,
};

const PaymentCreateModal: React.FC<Props> = ({ memberId, courseIds, onCancel }) => {
  const { validEmailSettings } = React.useContext(SettingsContext);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { message } = App.useApp();

  const paymentReason = React.useRef<string>();
  const [selectedFee, setSelectedFee] = React.useState<FeeSearcherQuery['fee']>();

  const [getMember, { data: memberData, loading: memberLoading, error: memberError }] = useMemberSearcherLazyQuery();

  React.useEffect(() => {
    if (memberId) {
      getMember({
        variables: {
          id: memberId,
        },
      });
    }
  }, [getMember, memberId]);

  const member = React.useMemo(() => {
    if (!memberLoading && !memberError && memberData) {
      return memberData.member;
    }
    return undefined;
  }, [memberData, memberError, memberLoading]);

  const paymentTypeOptions = React.useMemo(() => {
    const result = Object.keys(PaymentTypeEnum).map((paymentType) => ({
      label: t(`payments.type.${paymentType}`),
      value: paymentType,
    }));
    return result;
  }, [t]);

  const disableSendEmail = React.useMemo(() => {
    const result = !member?.email || !validEmailSettings;
    return result;
  }, [member?.email, validEmailSettings]);

  const helpSendEmail = React.useMemo(() => {
    const texts: string[] = [];
    if (member && !member.email) {
      texts.push(t('payments.form.sendEmail.help.member'));
    }
    if (!validEmailSettings) {
      texts.push(t('payments.form.sendEmail.help.currentUser'));
    }
    return texts.join(', ');
  }, [member, t, validEmailSettings]);

  const [createPayment, { loading: mutationLoading, error: mutationError }] = usePaymentCreateMutation({
    refetchQueries: ['Payments', 'Members'],
    onCompleted: () => {
      message.success(t('members.payments.created'));
      onCancel();
    },
  });

  const [sendEmail, { error: sendError }] = usePaymentSendReceiptMutation({
    refetchQueries: ['Payments', 'Emails'],
    onCompleted: () => {
      message.success(t('payments.sent'));
    },
  });

  useDisplayGraphQLErrors(mutationError, memberError, sendError);

  const handleSubmit: FormProps['onFinish'] = (values) => {
    const { sendEmail: sendEmailFlag, ...input } = values;

    createPayment({
      variables: {
        input: {
          memberId,
          ...input,
        },
      },
    })
      .then(async ({ data }) => {
        if (data && sendEmailFlag && !disableSendEmail) {
          const { id: paymentId } = data.paymentCreate.payment;
          const attachmentUri = await PDF.print(paymentId, 'data-url');
          if (!attachmentUri) {
            message.error(t('payments.printError'));
            return;
          }

          sendEmail({
            variables: {
              input: {
                id: paymentId,
                attachmentUri,
              },
            },
          });
        }
      })
      .catch(() => {});
  };

  return (
    <Modal
      title={t('payments.new')}
      open
      okButtonProps={{
        htmlType: 'submit',
        form: 'payment-create-form',
        loading: mutationLoading,
      }}
      onCancel={onCancel}
      zIndex={9999}
    >
      <Form
        id="payment-create-form"
        form={form}
        initialValues={initialValues}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item label={t('payments.form.fee')} name="feeId" rules={[{ required: true }]}>
          <FeeSearcher
            queryFilters={{ courseIds, sortBy: FeeSortEnum.NAME, sortDirection: SortDirectionEnum.ASC }}
            showCourse={courseIds.length > 1}
            allowClear={false}
            onChange={(_value, fee) => {
              if (fee) {
                setSelectedFee(fee);
                form.setFieldValue('amount', fee.amount);

                const years = getYears();

                let { reason } = fee;
                paymentReason.current = reason;
                reason = reason.replaceAll('[MESE]', format(Date.now(), 'MMMM yyyy'));
                reason = reason.replaceAll('[ANNO]', years.join(' - '));
                form.setFieldValue('reason', reason);
              }
            }}
          />
        </Form.Item>

        <Form.Item noStyle dependencies={['feeId']}>
          {({ getFieldValue }) => {
            const feeId = getFieldValue('feeId');
            if (!feeId || !selectedFee) {
              return undefined;
            }

            if (selectedFee.recurrence && [RecurrenceEnum.MONTHLY].includes(selectedFee.recurrence)) {
              return (
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

            if (selectedFee.recurrence && [RecurrenceEnum.ANNUAL].includes(selectedFee.recurrence)) {
              return (
                <Form.Item
                  label={t('payments.form.years')}
                  name="years"
                  rules={[{ required: true }]}
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
              <Form.Item label={t('payments.form.amount')} name="amount" rules={[{ required: true }]}>
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
          rules={[{ required: true }]}
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
              <Form.Item label={t('payments.form.reason')} name="reason" rules={[{ required: true }]}>
                <Input.TextArea disabled={!feeId} />
              </Form.Item>
            );
          }}
        </Form.Item>

        <Form.Item label={t('payments.form.paymentType')} name="type" rules={[{ required: true }]}>
          <Radio.Group options={paymentTypeOptions} />
        </Form.Item>

        <Spin spinning={memberLoading}>
          <Form.Item
            label={t('payments.form.sendEmail.label')}
            name="sendEmail"
            valuePropName="checked"
            help={helpSendEmail}
          >
            <Checkbox disabled={disableSendEmail} />
          </Form.Item>
        </Spin>
      </Form>
    </Modal>
  );
};

export default PaymentCreateModal;
