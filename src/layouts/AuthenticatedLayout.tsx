import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaMoneyBill, FaUserFriends } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { MemberCreatePage, MemberEditPage, MemberListPage } from '../core/members';
import { PaymentListPage } from '../core/payments';

const AuthenticatedLayout: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = React.useMemo(() => {
    const result: MenuProps['items'] = [
      {
        label: t('members'),
        key: 'members',
        icon: <Icon component={FaUserFriends} />,
        onClick: () => navigate('/members'),
      },
      {
        label: t('payments'),
        key: 'payments',
        icon: <Icon component={FaMoneyBill} />,
        onClick: () => navigate('/payments'),
      },
    ];
    return result;
  }, [navigate, t]);

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
          defaultSelectedKeys={['members']} // TODO: fix qui quando refresh pagina
          items={menuItems}
          style={{ width: '100%' }}
        />
      </Layout.Header>
      <Layout.Content style={{ padding: '15px 15px 15px 15px' }}>
        <Routes>
          <Route path="members" element={<Outlet />}>
            <Route index element={<MemberListPage />} />
            <Route path="new" element={<MemberCreatePage />} />
            <Route path=":id" element={<MemberEditPage />} />
          </Route>
          <Route path="payments" element={<Outlet />}>
            <Route index element={<PaymentListPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/members" replace />} />
        </Routes>
      </Layout.Content>
    </Layout>
  );
};

export default AuthenticatedLayout;
