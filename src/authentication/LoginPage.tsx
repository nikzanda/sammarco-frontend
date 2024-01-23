import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Card, Col, Form, Input, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthenticationContext } from '../contexts';

const LoginPage: React.FC = () => {
  const { login, loginError, loginLoading } = React.useContext(AuthenticationContext);
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    const { username, password } = values;
    login!(username, password);
  };

  return (
    <Row
      style={{
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      justify="center"
      align="middle"
    >
      <Col xs={18} sm={14} lg={8}>
        <Card title="Sammarco" headStyle={{ textAlign: 'center' }}>
          <Form onFinish={onFinish} autoComplete="off">
            <Form.Item name="username" rules={[{ required: true, message: t('validations.required')! }]}>
              <Input prefix={<UserOutlined />} placeholder={t('authentication.form.username')!} />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: t('validations.required')! }]}>
              <Input.Password prefix={<LockOutlined />} placeholder={t('authentication.form.password')!} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loginLoading}>
                {t('authentication.login')}
              </Button>
            </Form.Item>
          </Form>

          {loginError && <Alert type="error" description={loginError.message} showIcon />}
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
