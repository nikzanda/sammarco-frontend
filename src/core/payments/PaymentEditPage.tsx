import React from 'react';
import { App, Form, FormProps, Result, Skeleton, Space, Spin, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaPrint, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { usePaymentDeleteMutation, usePaymentQuery, usePaymentUpdateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { PaymentForm } from './components';
import PDF from './pdfs/receipt-pdf';
import { EditPageHeader, Updates } from '../../commons';

const DEFAULT_TAB = 'details';

const PaymentEditPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message, modal } = App.useApp();
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = React.useState<string>(searchParams.get('tab') || DEFAULT_TAB);

  React.useEffect(() => {
    searchParams.set('tab', tab);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, tab]);

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
      navigate('/payments');
    },
  });

  useDisplayGraphQLErrors(updateError, deleteError);

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

  const handlePrint = () => {
    PDF.print(id!);
  };

  const handleDelete = () => {
    deletePayment({
      variables: {
        input: {
          id: id!,
        },
      },
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
    <Space direction="vertical" style={{ width: '100%' }}>
      <EditPageHeader
        entity="payments"
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
              modal.confirm({
                title: t('payments.delete.description'),
                content: t('payments.delete.confirm'),
                onOk: () => handleDelete(),
              });
            },
          },
        ]}
      />

      {queryLoading && <Skeleton active />}
      {queryError && <Result status="500" title="500" subTitle={t('errors.somethingWentWrong')} />}
      {payment && (
        <Tabs
          activeKey={tab}
          onChange={setTab}
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
      )}
    </Space>
  );
};

export default PaymentEditPage;
