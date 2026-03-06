import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../authentication';
import { LoadingPage } from '../views';

const RegistrationPage = React.lazy(() => import('../core/registration/RegistrationPage'));

const UnauthenticatedLayout: React.FC = () => (
  <Suspense fallback={<LoadingPage />}>
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="registration/:socialYear" element={<RegistrationPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default UnauthenticatedLayout;
