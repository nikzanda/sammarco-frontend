import React, { Suspense } from 'react';
import { Button, Dropdown, DropdownProps, Layout, Menu, MenuProps } from 'antd';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaCalendarAlt,
  FaCog,
  FaMoon,
  FaMoneyBill,
  FaPaperPlane,
  FaReceipt,
  FaSun,
  FaUserFriends,
} from 'react-icons/fa';
import { GiKimono } from 'react-icons/gi';
import Icon, { LogoutOutlined } from '@ant-design/icons';
import { AuthenticationContext, SettingsProvider, ThemeContext } from '../contexts';
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

// Communication
const CommunicationPage = React.lazy(() => import('../core/communications/CommunicationPage'));

// Settings
const SettingsPage = React.lazy(() => import('../settings/SettingsPage'));

const AuthenticatedLayout: React.FC = () => {
  const { logout } = React.useContext(AuthenticationContext);
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
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
      {
        label: t('communication.name'),
        key: 'communication',
        icon: <Icon component={FaPaperPlane} />,
        onClick: () => navigate('/communication'),
      },
    ];
    return result;
  }, [navigate, t]);

  const dropdownMenu = React.useMemo(() => {
    const result: DropdownProps['menu'] = {
      items: [
        {
          label: isDarkMode ? t('theme.lightMode') : t('theme.darkMode'),
          key: 'theme',
          icon: isDarkMode ? <Icon component={FaSun} /> : <Icon component={FaMoon} />,
        },
        {
          label: t('settings.name'),
          key: 'settings',
          icon: <Icon component={FaCog} />,
        },
        {
          type: 'divider',
        },
        {
          label: t('authentication.logout'),
          key: 'logout',
          icon: <LogoutOutlined />,
          danger: true,
        },
      ],
      onClick: ({ key }) => {
        switch (key) {
          case 'theme':
            toggleTheme();
            break;

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
  }, [isDarkMode, logout, navigate, t, toggleTheme]);

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
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKey}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Dropdown menu={dropdownMenu} placement="bottomRight" trigger={['click']}>
          <Button
            shape="circle"
            size="large"
            icon={<Icon component={FaCog} />}
            ghost
            style={{ color: 'rgba(255, 255, 255, 0.85)', flexShrink: 0 }}
          />
        </Dropdown>
      </Layout.Header>
      <Layout.Content style={{ padding: 16, overflowY: 'auto' }}>
        <SettingsProvider>
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

              <Route path="communication" element={<CommunicationPage />} />

              <Route path="settings" element={<Outlet />}>
                <Route index element={<SettingsPage />} />
              </Route>

              <Route path="/" element={<Navigate to="/members" replace />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </SettingsProvider>
      </Layout.Content>
    </Layout>
  );
};

export default AuthenticatedLayout;
