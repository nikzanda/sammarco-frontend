import React from 'react';
import { App, Button, Col, Form, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { useFeeCreateMutation, useFeeLazyQuery } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { FeeForm } from './components';

const FeeCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = App.useApp();

  const [getFee, { data: queryData, loading: queryLoading, error: queryError }] = useFeeLazyQuery();

  const [createFee, { loading: mutationLoading, error: mutationError }] = useFeeCreateMutation({
    refetchQueries: ['Fees', 'FeesSearcher'],
    onCompleted: () => {
      message.success(t('fees.created'));
      navigate(-1);
    },
  });

  useDisplayGraphQLErrors(mutationError, queryError);

  React.useEffect(() => {
    if (location.state) {
      const { feeId } = location.state as { feeId: string };
      getFee({
        variables: {
          id: feeId,
        },
      });
    }
  }, [getFee, location.state]);

  const initialValues = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      const { fee } = queryData;
      return {
        name: fee.name,
        courseId: fee.course.id,
        amount: fee.amount,
        recurrence: fee.recurrence,
        reason: fee.reason,
      };
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const showForm = React.useMemo(() => {
    if (!location.state || initialValues) {
      return true;
    }

    return false;
  }, [initialValues, location.state]);

  const handleFinish = (values: any) => {
    createFee({
      variables: {
        input: values,
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
          <Typography.Title level={3}>{t('fees.new')}</Typography.Title>
        </Col>
        <Col xs={5} md={2} style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
          <Button type="primary" htmlType="submit" form="form" size="large" loading={mutationLoading}>
            {t('buttons.save.label')}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Form id="form" initialValues={initialValues} layout="vertical" autoComplete="off" onFinish={handleFinish}>
          <FeeForm />
        </Form>
      )}
    </Space>
  );
};

export default FeeCreatePage;
