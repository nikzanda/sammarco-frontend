import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Watermark } from 'antd';
import { AuthenticationContext } from './contexts';
import { LoadingPage } from './views';
import { getYears } from './utils';

const AuthenticatedLayout = React.lazy(() => import('./layouts/AuthenticatedLayout'));
const UnauthenticatedLayout = React.lazy(() => import('./layouts/UnauthenticatedLayout'));

const { REACT_APP_BASENAME } = process.env;
const showWatermark = parseInt(REACT_APP_BASENAME!, 10) - 1 < getYears()[0];

const App: React.FC = () => {
  const { currentUser, loading } = React.useContext(AuthenticationContext);

  const routerContent = React.useMemo(() => {
    const result = (
      <Router basename={`/${REACT_APP_BASENAME}`}>
        {!loading && !currentUser && <UnauthenticatedLayout />}
        {currentUser && <AuthenticatedLayout />}
      </Router>
    );
    return result;
  }, [currentUser, loading]);

  return (
    <Suspense fallback={<LoadingPage />}>
      {showWatermark ? <Watermark content={REACT_APP_BASENAME}>{routerContent}</Watermark> : routerContent}
    </Suspense>
  );
};

export default App;
