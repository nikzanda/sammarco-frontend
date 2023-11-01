import React from 'react';
import { App, Button, Col, Result, Row, Skeleton, Space, Spin, Tabs, Typography, Form, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { useFeeDeleteMutation, useFeeQuery, useFeeUpdateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { FeeForm } from './components';
import PDF from '../payments/pdfs/receipt-pdf';
import { Updates } from '../../commons';

const FeeEditPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useFeeQuery({
    variables: {
      id: id!,
    },
  });

  const [updateFee, { loading: updateLoading, error: updateError }] = useFeeUpdateMutation({
    refetchQueries: ['Fees', 'Fee'],
    onCompleted: () => {
      message.success(t('fees.edited'));
    },
  });

  const [deleteFee, { loading: deleteLoading, error: deleteError }] = useFeeDeleteMutation({
    refetchQueries: ['Fees'],
    onCompleted: () => {
      message.success(t('fees.deleted'));
      navigate(-1);
    },
  });

  useDisplayGraphQLErrors([queryError, updateError, deleteError]);

  const fee = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.fee;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const title = React.useMemo(() => {
    if (!fee) {
      return <Spin />;
    }
    return fee.name;
  }, [fee]);

  const initialValues = React.useMemo(() => {
    if (fee) {
      const result = {
        ...fee,
        courseId: fee.course?.id,
      };
      return result;
    }
    return undefined;
  }, [fee]);

  const handleDelete = () => {
    deleteFee({
      variables: {
        input: {
          id: id!,
        },
      },
    });
  };

  const handlePrint = () => {
    PDF.printFacSimile(fee!);
  };

  const handleFinish = (values: any) => {
    const { courseId, ...input } = values;

    updateFee({
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
          {/* TODO: stampa ricevuta di prova */}
          {fee?.canDelete && (
            <Popconfirm
              title={t('fees.delete.confirm')}
              description={t('fees.delete.description', { name: fee.name })}
              onConfirm={handleDelete}
            >
              <Button type="primary" size="large" danger loading={deleteLoading}>
                {t('buttons.delete.label')}
              </Button>
            </Popconfirm>
          )}
          <Button size="large" onClick={handlePrint}>
            {t('buttons.printFacSimile.label')}
          </Button>
          <Button type="primary" htmlType="submit" form="form" size="large" loading={updateLoading}>
            {t('buttons.save.label')}
          </Button>
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
      {fee && (
        <Tabs
          items={[
            {
              label: t('fees.tab.details'),
              key: 'details',
              children: (
                <>
                  <Form
                    id="form"
                    initialValues={initialValues}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleFinish}
                  >
                    <FeeForm fee={fee} />
                  </Form>

                  <Updates updates={fee} />
                </>
              ),
            },
          ]}
        />
      )}
    </Space>
  );
};

export default FeeEditPage;
