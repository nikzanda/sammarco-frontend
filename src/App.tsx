import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Watermark } from 'antd';
import { AuthenticationContext } from './contexts';
import { LoadingPage } from './views';
import { getRealCurrentYears } from './utils';

const AuthenticatedLayout = React.lazy(() => import('./layouts/AuthenticatedLayout'));
const UnauthenticatedLayout = React.lazy(() => import('./layouts/UnauthenticatedLayout'));

const socialYear = import.meta.env.VITE_SOCIAL_YEAR;
const showWatermark = parseInt(socialYear, 10) < getRealCurrentYears()[0];

const App: React.FC = () => {
  const { currentUser, loading } = React.useContext(AuthenticationContext);

  const routerContent = React.useMemo(
    () => (
      <Router basename={`/${socialYear}`}>
        {!loading && !currentUser && <UnauthenticatedLayout />}
        {currentUser && <AuthenticatedLayout />}
      </Router>
    ),
    [currentUser, loading]
  );

  return (
    <Suspense fallback={<LoadingPage />}>
      {showWatermark ? <Watermark content={socialYear}>{routerContent}</Watermark> : routerContent}
    </Suspense>
  );
};

export default App;
