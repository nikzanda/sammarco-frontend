import React, { Suspense } from 'react';
import { Button, Dropdown, DropdownProps, Layout, Menu, MenuProps } from 'antd';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaCog, FaMoneyBill, FaReceipt, FaUserFriends } from 'react-icons/fa';
import { GiKimono } from 'react-icons/gi';
import Icon, { LogoutOutlined } from '@ant-design/icons';
import { AuthenticationContext } from '../contexts';
import { LoadingPage, NotFoundPage } from '../views';

// Members
const MemberCreatePage = React.lazy(() => import('../core/members/MemberCreatePage'));
const MemberEditPage = React.lazy(() => import('../core/members/MemberEditPage'));
const MemberListPage = React.lazy(() => import('../core/members/MemberListPage'));

// Courses
const CourseCreatePage = React.lazy(() => import('../core/courses/CourseCreatePage'));
const CourseEditPage = React.lazy(() => import('../core/courses/CourseEditPage'));
const CourseListPage = React.lazy(() => import('../core/courses/CourseListPage'));

// Fees
const FeeListPage = React.lazy(() => import('../core/fees/FeeListPage'));
const FeeCreatePage = React.lazy(() => import('../core/fees/FeeCreatePage'));
const FeeEditPage = React.lazy(() => import('../core/fees/FeeEditPage'));

// Payments
const PaymentEditPage = React.lazy(() => import('../core/payments/PaymentEditPage'));
const PaymentListPage = React.lazy(() => import('../core/payments/PaymentListPage'));

// Calendar
const CalendarPage = React.lazy(() => import('../core/attendances/CalendarPage'));

// Settings
const SettingsPage = React.lazy(() => import('../settings/SettingsPage'));

const AuthenticatedLayout: React.FC = () => {
  const { logout } = React.useContext(AuthenticationContext);
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
        label: t('courses.name'),
        key: 'courses',
        icon: <Icon component={GiKimono} />,
        onClick: () => navigate('/courses'),
      },
      {
        label: t('fees.name'),
        key: 'fees',
        icon: <Icon component={FaReceipt} />,
        onClick: () => navigate('/fees'),
      },
      {
        label: t('payments.name'),
        key: 'payments',
        icon: <Icon component={FaMoneyBill} />,
        onClick: () => navigate('/payments'),
      },
      {
        label: t('calendar.name'),
        key: 'calendar',
        icon: <Icon component={FaCalendarAlt} />,
        onClick: () => navigate('/calendar'),
      },
    ];
    return result;
  }, [navigate, t]);

  const dropdownMenu = React.useMemo(() => {
    const result: DropdownProps['menu'] = {
      items: [
        {
          label: t('settings.name'),
          key: 'settings',
          icon: <Icon component={FaCog} />,
        },
        {
          label: t('authentication.logout'),
          key: 'logout',
          icon: <LogoutOutlined />,
        },
      ],
      onClick: ({ key }) => {
        switch (key) {
          case 'settings':
            navigate('/settings');
            break;

          case 'logout':
            logout!();
            break;
        }
      },
    };
    return result;
  }, [logout, navigate, t]);

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
        <Menu theme="dark" mode="horizontal" selectedKeys={selectedKey} items={menuItems} style={{ width: '100%' }} />
        <Dropdown menu={dropdownMenu} placement="bottomRight" trigger={['click']}>
          <Button shape="circle" size="large" icon={<Icon component={FaCog} />} ghost />
        </Dropdown>
      </Layout.Header>
      <Layout.Content style={{ padding: '0 15px 15px 15px', overflowY: 'scroll' }}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="members" element={<Outlet />}>
              <Route index element={<MemberListPage />} />
              <Route path="new" element={<MemberCreatePage />} />
              <Route path=":id" element={<MemberEditPage />} />
            </Route>

            <Route path="courses" element={<Outlet />}>
              <Route index element={<CourseListPage />} />
              <Route path="new" element={<CourseCreatePage />} />
              <Route path=":id" element={<CourseEditPage />} />
            </Route>

            <Route path="fees" element={<Outlet />}>
              <Route index element={<FeeListPage />} />
              <Route path="new" element={<FeeCreatePage />} />
              <Route path=":id" element={<FeeEditPage />} />
            </Route>

            <Route path="payments" element={<Outlet />}>
              <Route index element={<PaymentListPage />} />
              <Route path=":id" element={<PaymentEditPage />} />
            </Route>

            <Route path="calendar" element={<CalendarPage />} />

            <Route path="settings" element={<Outlet />}>
              <Route index element={<SettingsPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/members" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout.Content>
    </Layout>
  );
};

export default AuthenticatedLayout;
