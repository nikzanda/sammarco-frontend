import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticatedLayout, UnauthenticatedLayout } from './layouts';
import './App.css';
import { AuthenticationContext } from './contexts';

const App: React.FC = () => {
  const { currentUser, loading } = React.useContext(AuthenticationContext);

  return (
    <Router>
      {!loading && !currentUser && <UnauthenticatedLayout />}
      {currentUser && <AuthenticatedLayout />}
    </Router>
  );
};

export default App;
