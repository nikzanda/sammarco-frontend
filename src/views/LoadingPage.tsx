import React from 'react';
import { Layout, Spin, theme } from 'antd';

const LoadingPage: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Layout.Content
      style={{ textAlign: 'center', minHeight: '100vh', lineHeight: '100vh', backgroundColor: token.colorBgLayout }}
    >
      <Spin spinning size="large" />
    </Layout.Content>
  );
};

export default LoadingPage;
