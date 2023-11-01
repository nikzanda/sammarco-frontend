import { App, Button, Col, Form, Result, Row, Skeleton, Space, Spin, Tabs, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaAngleLeft } from 'react-icons/fa';
import { format } from 'date-fns';
import { usePaymentQuery, usePaymentUpdateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { PaymentForm } from './components';
import PDF from './pdfs/receipt-pdf';
import { Updates } from '../../commons';

const PaymentEditPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm();

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

  useDisplayGraphQLErrors([updateError]);

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
        feeId: payment.fee.id,
      };
      return result;
    }
    return undefined;
  }, [payment]);

  const handlePrint = () => {
    PDF.print(id!);
  };

  const handleFinish = (values: any) => {
    const { feeId, month, ...input } = values;
    updatePayment({
      variables: {
        input: {
          id: id!,
          ...input,
        },
      },
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="space-between" align="middle">
        <Col xs={1} md={2}>
          <Button shape="circle" size="middle" icon={<Icon component={FaAngleLeft} />} onClick={() => navigate(-1)} />
        </Col>
        <Col xs={12} md={20}>
          <Typography.Title level={3}>{title}</Typography.Title>
        </Col>
        <Col xs={5} md={2} style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
          <Space>
            {/* {payment?.canDelete && (
              <Popconfirm
                title={t('payments.delete.confirm')}
                description={t('payments.delete.description')}
                onConfirm={handleDelete}
              >
                <Button type="primary" size="large" danger loading={deleteLoading}>
                  {t('buttons.delete.label')}
                </Button>
              </Popconfirm>
            )} */}
            <Button size="large" loading={updateLoading} onClick={handlePrint}>
              {t('buttons.print.label')}
            </Button>
            <Button type="primary" htmlType="submit" form="form" size="large" loading={updateLoading}>
              {t('buttons.save.label')}
            </Button>
          </Space>
        </Col>
      </Row>

      {queryLoading && <Skeleton active />}
      {queryError && (
        <Result
          status="500"
          title="500"
          subTitle={t('errors.something-went-wrong')} // TODO: refetch
        />
      )}
      {payment && (
        <Tabs
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
                    <PaymentForm form={form} payment={payment} />
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
