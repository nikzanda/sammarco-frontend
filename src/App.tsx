import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticatedLayout } from './layouts';
import './App.css';

// eslint-disable-next-line arrow-body-style
const App: React.FC = () => {
  return (
    <Router>
      <AuthenticatedLayout />
    </Router>
  );
};

export default App;
