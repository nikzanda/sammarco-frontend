import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloProvider } from '@apollo/client/react';
import { Alert } from 'antd';
import itIT from 'antd/es/locale/it_IT';
import { setDefaultOptions } from 'date-fns';
import { it } from 'date-fns/locale';
import App from './App';
import apolloClient from './apollo';
import { AuthenticationProvider, ThemeProvider } from './contexts';
import './i18n';

setDefaultOptions({ locale: it });

itIT.Calendar!.lang.locale = 'it';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <Alert.ErrorBoundary>
          <AuthenticationProvider>
            <App />
          </AuthenticationProvider>
        </Alert.ErrorBoundary>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
