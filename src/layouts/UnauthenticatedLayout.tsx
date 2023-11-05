import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../authentication';

const UnauthenticatedLayout: React.FC = () => (
  <Routes>
    <Route index element={<LoginPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default UnauthenticatedLayout;
