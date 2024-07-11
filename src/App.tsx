import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Layout, Spin } from 'antd';
import { AuthenticationContext } from './contexts';

const AuthenticatedLayout = React.lazy(() => import('./layouts/AuthenticatedLayout'));
const UnauthenticatedLayout = React.lazy(() => import('./layouts/UnauthenticatedLayout'));

const App: React.FC = () => {
  const { currentUser, loading } = React.useContext(AuthenticationContext);

  return (
    <Suspense
      fallback={
        <Layout.Content style={{ textAlign: 'center', minHeight: '100vh', lineHeight: '100vh' }}>
          <Spin spinning size="large" />
        </Layout.Content>
      }
    >
      <Router>
        {!loading && !currentUser && <UnauthenticatedLayout />}
        {currentUser && <AuthenticatedLayout />}
      </Router>
    </Suspense>
  );
};

export default App;
