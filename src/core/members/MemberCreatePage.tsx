import React from 'react';
import Icon from '@ant-design/icons';
import { App, Button, Col, Form, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MemberForm } from './components';
import { useMemberCreateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';

const MemberCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [createMember, { loading, error }] = useMemberCreateMutation({
    refetchQueries: ['Members'],
    onCompleted: () => {
      message.success(t('created'));
      navigate(-1);
    },
  });

  useDisplayGraphQLErrors([error]);

  const handleFinish = (values: any) => {
    createMember({
      variables: {
        input: values,
      },
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="space-between">
        <Col span={2}>
          <Button
            shape="circle"
            size="middle"
            icon={<Icon component={FaAngleLeft} />}
            onClick={() => navigate('/customers')}
          />
        </Col>
        <Col span={20}>
          <Typography.Title level={3}>{t('member.new')}</Typography.Title>
        </Col>
        <Col span={2}>
          <Button type="primary" htmlType="submit" form="form" loading={loading}>
            {t('create')}
          </Button>
        </Col>
      </Row>

      <Form id="form" layout="vertical" autoComplete="off" onFinish={handleFinish}>
        <MemberForm />
      </Form>
    </Space>
  );
};

export default MemberCreatePage;