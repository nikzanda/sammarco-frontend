import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaMoneyBill, FaUserFriends } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { MemberCreatePage, MemberEditPage, MemberListPage } from '../core/members';
import { PaymentListPage } from '../core/payments';

const AuthenticatedLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = React.useMemo(() => {
    const result: MenuProps['items'] = [
      {
        label: t('members.name'),
        key: 'members',
        icon: <Icon component={FaUserFriends} />,
        onClick: () => navigate('/members'),
      },
      {
        label: t('payments.name'),
        key: 'payments',
        icon: <Icon component={FaMoneyBill} />,
        onClick: () => navigate('/payments'),
      },
    ];
    return result;
  }, [navigate, t]);

  const selectedKey = React.useMemo(() => {
    const item = menuItems.find(({ key }: any) => location.pathname.includes(key));
    if (item) {
      return [item.key as string];
    }

    return [];
  }, [location.pathname, menuItems]);

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
        <Menu theme="dark" mode="horizontal" selectedKeys={selectedKey} items={menuItems} style={{ width: '100%' }} />
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
