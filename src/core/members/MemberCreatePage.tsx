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
  const [form] = Form.useForm();

  const [createMember, { loading, error }] = useMemberCreateMutation({
    refetchQueries: ['Members', 'MembersSearcher'],
    onCompleted: () => {
      message.success(t('members.created'));
      navigate('/members');
    },
  });

  useDisplayGraphQLErrors(error);

  const handleFinish = (values: any) => {
    createMember({
      variables: {
        input: values,
      },
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="space-between" align="middle">
        <Col xs={1} md={2}>
          <Button
            shape="circle"
            size="middle"
            icon={<Icon component={FaAngleLeft} />}
            onClick={() => navigate('/members')}
          />
        </Col>
        <Col xs={12} md={20}>
          <Typography.Title level={3}>{t('members.new')}</Typography.Title>
        </Col>
        <Col xs={5} md={2} style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
          <Button type="primary" htmlType="submit" form="form" size="large" loading={loading}>
            {t('buttons.save.label')}
          </Button>
        </Col>
      </Row>

      <Form id="form" form={form} layout="vertical" autoComplete="off" onFinish={handleFinish}>
        <MemberForm form={form} />
      </Form>
    </Space>
  );
};

export default MemberCreatePage;
