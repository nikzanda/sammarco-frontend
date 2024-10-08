import React, { PropsWithChildren } from 'react';
import { ApolloError, useApolloClient } from '@apollo/client';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { MeQuery, useLoginMutation, useMeQuery } from '../generated/graphql';
import { useDisplayGraphQLErrors } from '../hooks';

interface IAuthenticationContext {
  loading?: boolean;
  currentUser?: MeQuery['me'];
  login?: (username: string, password: string) => Promise<void>;
  loginLoading?: boolean;
  loginError?: ApolloError;
  logout?: () => void;
}

const isAuthenticated = () => {
  const token = window.localStorage.getItem('token');
  if (!token) {
    return undefined;
  }

  const decoded = jwtDecode<JwtPayload>(token);
  const { exp } = decoded;
  const expirationDate = new Date(exp! * 1000);

  if (new Date() > expirationDate) {
    return undefined;
  }

  return token;
};

export const AuthenticationContext = React.createContext<IAuthenticationContext>({});

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loginAction, { loading: mutationLoading, data: mutationData, error: mutationError }] = useLoginMutation();

  const client = useApolloClient();

  // const [getMe, { loading: meLoading, data: meData }] = useMeLazyQuery();
  const {
    data: meData,
    loading: meLoading,
    refetch: meRefetch,
  } = useMeQuery({
    skip: !isAuthenticated(),
  });

  const login = React.useCallback(
    async (username: string, password: string) => {
      loginAction({
        variables: {
          input: {
            username,
            password,
          },
        },
      });
    },
    [loginAction]
  );

  const logout = React.useCallback(() => {
    window.localStorage.removeItem('token');
    client.clearStore();
    client.resetStore();
    window.location.replace('');
  }, [client]);

  // React.useEffect(() => {
  //   if (isAuthenticated()) {
  //     getMe()
  //   }
  // }, [getMe])

  useDisplayGraphQLErrors(mutationError);

  React.useEffect(() => {
    if (!mutationLoading && !mutationError && mutationData) {
      const { token } = mutationData.login;
      window.localStorage.setItem('token', token);
      meRefetch();
    } else if (mutationError) {
      localStorage.removeItem('token');
    }
  }, [mutationLoading, mutationData, mutationError, meRefetch]);

  const value = React.useMemo(() => {
    if (meData) {
      return {
        login,
        logout,
        currentUser: meData.me,
        loading: meLoading,
        loginLoading: mutationLoading,
        loginError: mutationError,
      };
    }
    return {
      login,
      logout,
      loading: meLoading,
      loginLoading: mutationLoading,
      loginError: mutationError,
    };
  }, [login, logout, meData, meLoading, mutationError, mutationLoading]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export const { Consumer: AuthenticationConsumer } = AuthenticationContext;
