import React from 'react';
import { Layout, Menu } from 'antd';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { MemberListPage } from '../core/members';

// eslint-disable-next-line arrow-body-style
const AuthenticatedLayout: React.FC = () => {
  // const navigate = useNavigate()
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Layout.Header>
      <Layout.Content style={{ padding: '0 50px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        {/* <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>Content</div> */}
        <Routes>
          <Route path="members" element={<Outlet />}>
            <Route index element={<MemberListPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/members" replace />} />
        </Routes>
      </Layout.Content>
    </Layout>
  );
};

export default AuthenticatedLayout;
