import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { Alert } from 'antd';
import itIT from 'antd/es/locale/it_IT';
import { setDefaultOptions } from 'date-fns';
import { it } from 'date-fns/locale';
import App from './App';
import reportWebVitals from './reportWebVitals';
import apolloClient from './apollo';
import { AuthenticationProvider, SettingsProvider, ThemeProvider } from './contexts';
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
            <SettingsProvider>
              <App />
            </SettingsProvider>
          </AuthenticationProvider>
        </Alert.ErrorBoundary>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
