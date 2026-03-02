import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationContext, SocialYearProvider } from './contexts';
import { LoadingPage } from './views';

const AuthenticatedLayout = React.lazy(() => import('./layouts/AuthenticatedLayout'));
const UnauthenticatedLayout = React.lazy(() => import('./layouts/UnauthenticatedLayout'));

const AppContent: React.FC = () => {
  const { currentUser, loading } = React.useContext(AuthenticationContext);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Router>
        {!loading && !currentUser && <UnauthenticatedLayout />}
        {currentUser && <AuthenticatedLayout />}
      </Router>
    </Suspense>
  );
};

const App: React.FC = () => (
  <SocialYearProvider>
    <AppContent />
  </SocialYearProvider>
);

export default App;
