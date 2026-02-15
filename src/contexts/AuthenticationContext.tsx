import React, { PropsWithChildren } from 'react';
import { ApolloError, useApolloClient } from '@apollo/client';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { MeQuery, useLoginMutation, useMeQuery } from '../generated/graphql';
import { useDisplayGraphQLErrors } from '../hooks';

interface IAuthenticationContext {
  loading: boolean;
  currentUser?: MeQuery['me'];
  login: (username: string, password: string) => Promise<void>;
  loginLoading: boolean;
  loginError?: ApolloError;
  logout: () => void;
}

const isAuthenticated = () => {
  const token = window.localStorage.getItem('token');
  if (!token) {
    return undefined;
  }

  const decoded = jwtDecode<JwtPayload>(token);
  const { exp } = decoded;

  if (!exp || new Date() > new Date(exp * 1000)) {
    return undefined;
  }

  return token;
};

const noop = () => {};

export const AuthenticationContext = React.createContext<IAuthenticationContext>({
  loading: false,
  login: async () => {},
  loginLoading: false,
  logout: noop,
});

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({ children = undefined }) => {
  const [loginAction, { loading: mutationLoading, data: mutationData, error: mutationError }] = useLoginMutation();

  const client = useApolloClient();

  const {
    data: meData,
    loading: meLoading,
    refetch: meRefetch,
  } = useMeQuery({
    skip: !isAuthenticated(),
  });

  const login = React.useCallback(
    async (username: string, password: string) => {
      await loginAction({
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
    client.resetStore();
    window.location.reload();
  }, [client]);

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

  const value = React.useMemo(
    () => ({
      login,
      logout,
      currentUser: meData?.me,
      loading: meLoading,
      loginLoading: mutationLoading,
      loginError: mutationError,
    }),
    [login, logout, meData, meLoading, mutationError, mutationLoading]
  );

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export const { Consumer: AuthenticationConsumer } = AuthenticationContext;
