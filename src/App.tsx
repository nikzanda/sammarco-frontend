import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Watermark } from 'antd';
import { AuthenticationContext } from './contexts';
import { LoadingPage } from './views';
import { getYears } from './utils';

const AuthenticatedLayout = React.lazy(() => import('./layouts/AuthenticatedLayout'));
const UnauthenticatedLayout = React.lazy(() => import('./layouts/UnauthenticatedLayout'));

const { REACT_APP_SOCIAL_YEAR } = process.env;
const showWatermark = parseInt(REACT_APP_SOCIAL_YEAR!, 10) < getYears()[0];

const App: React.FC = () => {
  const { currentUser, loading } = React.useContext(AuthenticationContext);

  const routerContent = React.useMemo(
    () => (
      <Router basename={`/${REACT_APP_SOCIAL_YEAR}`}>
        {!loading && !currentUser && <UnauthenticatedLayout />}
        {currentUser && <AuthenticatedLayout />}
      </Router>
    ),
    [currentUser, loading]
  );

  return (
    <Suspense fallback={<LoadingPage />}>
      {showWatermark ? <Watermark content={REACT_APP_SOCIAL_YEAR}>{routerContent}</Watermark> : routerContent}
    </Suspense>
  );
};

export default App;
