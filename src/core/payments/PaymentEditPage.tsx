import React from 'react';
import {
  App,
  Card,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Modal,
  Result,
  Skeleton,
  Spin,
  Tabs,
  theme,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Icon, { ExclamationCircleFilled } from '@ant-design/icons';
import { FaPrint, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import {
  usePaymentDeleteMutation,
  usePaymentQuery,
  usePaymentSendReceiptMutation,
  usePaymentUpdateMutation,
} from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { PaymentForm } from './components';
import PDF from './pdfs/receipt-pdf';
import { EditPageHeader, Updates } from '../../commons';
import { getURLTab, setURLTab } from '../../utils';
import { SettingsContext } from '../../contexts';

const DEFAULT_TAB = 'details';

const PaymentEditPage: React.FC = () => {
  const { validEmailSettings } = React.useContext(SettingsContext);
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const [tab, setTab] = React.useState(getURLTab() || DEFAULT_TAB);
  const [checked, setChecked] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setURLTab(getURLTab() || DEFAULT_TAB);
  }, []);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = usePaymentQuery({
    variables: {
      id: id!,
    },
  });

  const [updatePayment, { loading: updateLoading, error: updateError }] = usePaymentUpdateMutation({
    refetchQueries: ['Payments', 'Payment', 'Members', 'Member', 'PaymentsPdf', 'PaymentPdf'],
    onCompleted: () => {
      message.success(t('payments.edited'));
    },
  });

  const [deletePayment, { loading: deleteLoading, error: deleteError }] = usePaymentDeleteMutation({
    refetchQueries: ['Payments'],
    onCompleted: () => {
      message.success(t('payments.deleted'));
    },
  });

  const [sendEmail, { loading: sendLoading, error: sendError }] = usePaymentSendReceiptMutation({
    refetchQueries: ['Payments', 'Emails'],
    onCompleted: () => {
      message.success(t('payments.sent'));
    },
  });

  useDisplayGraphQLErrors(updateError, deleteError, sendError);

  const payment = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.payment;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const title = React.useMemo(() => {
    if (!payment) {
      return <Spin />;
    }
    return (
      <>
        {payment.member.fullName} - {payment.fee.name}
        {payment.month && <> - {format(new Date(payment.month), 'MMMM yyyy')}</>}
        {payment.years && payment.years.length > 0 && <> - {payment.years.join(' / ')}</>}
      </>
    );
  }, [payment]);

  const initialValues = React.useMemo(() => {
    if (payment) {
      const result = {
        ...payment,
        memberId: payment.member.id,
        feeId: payment.fee.id,
      };
      return result;
    }
    return undefined;
  }, [payment]);

  const disableSendEmail = React.useMemo(() => {
    const result = !validEmailSettings;
    return result;
  }, [validEmailSettings]);

  const helpSendEmail = React.useMemo(() => {
    if (disableSendEmail) {
      return <Typography.Text type="secondary">{t('payments.form.sendEmail.help.currentUser')}</Typography.Text>;
    }
    return undefined;
  }, [disableSendEmail, t]);

  const handlePrint = () => {
    PDF.print(id!);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deletePayment({
      variables: {
        input: {
          id: id!,
        },
      },
    })
      .then(async ({ data }) => {
        if (!data || !checked || disableSendEmail) {
          navigate('/payments');
          return;
        }

        const {
          paymentDelete: { updatedPayments },
        } = data;

        for (const updatedPayment of updatedPayments) {
          const attachmentUri = await PDF.print(updatedPayment.id, 'data-url');
          if (!attachmentUri) {
            message.error(t('payments.printError'));
            continue;
          }

          await sendEmail({
            variables: {
              input: {
                id: updatedPayment.id,
                attachmentUri,
              },
            },
          });
        }

        navigate('/payments');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFinish: FormProps['onFinish'] = (values) => {
    updatePayment({
      variables: {
        input: {
          id: id!,
          ...values,
        },
      },
    });
  };

  return (
    <Flex vertical gap="middle">
      <EditPageHeader
        title={title}
        submitButtonProps={{
          loading: updateLoading,
        }}
        actions={[
          {
            key: 'print',
            label: t('buttons.print.label'),
            icon: <Icon component={FaPrint} />,
            onClick: () => handlePrint(),
          },
          {
            key: 'delete',
            label: t('buttons.delete.label'),
            disabled: !payment?.canDelete,
            icon: <Icon component={FaTrash} spin={deleteLoading} />,
            danger: true,
            onClick: () => {
              setOpen(true);
            },
          },
        ]}
      />

      {queryLoading && <Skeleton active />}
      {queryError && <Result status="500" title="500" subTitle={t('errors.somethingWentWrong')} />}
      {payment && (
        <>
          <Card styles={{ body: { paddingTop: 0 } }}>
            <Tabs
              activeKey={tab}
              onChange={(newTab) => {
                setURLTab(newTab);
                setTab(newTab);
              }}
              items={[
                {
                  label: t('payments.tab.details'),
                  key: 'details',
                  children: (
                    <>
                      <Form
                        id="form"
                        form={form}
                        initialValues={initialValues}
                        layout="vertical"
                        autoComplete="off"
                        onFinish={handleFinish}
                      >
                        <PaymentForm payment={payment} />
                      </Form>

                      <Updates updates={payment} />
                    </>
                  ),
                },
              ]}
            />
          </Card>

          <Modal
            title={
              <>
                <ExclamationCircleFilled style={{ color: token.colorError }} /> {t('payments.delete.description')}
              </>
            }
            open={open}
            okButtonProps={{
              loading: deleteLoading || sendLoading || loading,
            }}
            onOk={() => handleDelete()}
            onCancel={() => setOpen(false)}
            maskClosable={false}
            destroyOnClose
          >
            <Flex vertical>
              <span>{t('payments.delete.confirm')}</span>
              <span>{t('payments.delete.warning')}</span>
            </Flex>
            <p>
              <Checkbox checked={checked} onChange={(e) => setChecked(e.target.value)} disabled={disableSendEmail}>
                {t('payments.delete.sendEmail')}
              </Checkbox>
              {disableSendEmail && helpSendEmail}
            </p>
          </Modal>
        </>
      )}
    </Flex>
  );
};

export default PaymentEditPage;
