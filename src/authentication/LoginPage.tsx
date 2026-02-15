import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Card, Flex, Form, Input, theme } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthenticationContext } from '../contexts';

const LoginPage: React.FC = () => {
  const { login, loginError, loginLoading } = React.useContext(AuthenticationContext);
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const onFinish = (values: any) => {
    const { username, password } = values;
    login!(username, password);
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: '100vh',
        backgroundColor: token.colorBgLayout,
      }}
    >
      <Card
        title="Sammarco"
        styles={{
          header: {
            textAlign: 'center',
            fontSize: 20,
          },
        }}
        style={{ width: 400, maxWidth: '90vw' }}
      >
        <Form onFinish={onFinish} autoComplete="off" size="large">
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} placeholder={t('authentication.form.username')!} />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder={t('authentication.form.password')!} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block loading={loginLoading}>
              {t('authentication.login')}
            </Button>
          </Form.Item>
        </Form>

        {loginError && <Alert type="error" description={loginError.message} showIcon style={{ marginTop: 16 }} />}
      </Card>
    </Flex>
  );
};

export default LoginPage;
