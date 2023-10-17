import React from 'react';
import { App, Button, Col, Form, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { useFeeCreateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { FeeForm } from './components';

const FeeCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [createFee, { loading, error }] = useFeeCreateMutation({
    refetchQueries: ['Fees'],
    onCompleted: () => {
      message.success(t('fees.created'));
      navigate(-1);
    },
  });

  useDisplayGraphQLErrors([error]);

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
        <Col xs={5} md={2} style={{ display: 'flex', justifyContent: 'end' }}>
          <Button type="primary" htmlType="submit" form="form" size="large" loading={loading}>
            {t('buttons.save.label')}
          </Button>
        </Col>
      </Row>

      <Form id="form" layout="vertical" autoComplete="off" onFinish={handleFinish}>
        <FeeForm />
      </Form>
    </Space>
  );
};

export default FeeCreatePage;
