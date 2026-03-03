import React, { PropsWithChildren } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client/react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { LoginDocument, MeDocument } from '../gql/graphql';
import { useDisplayGraphQLErrors } from '../hooks';
import { AuthenticationContext } from './AuthenticationContext';

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

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({ children = undefined }) => {
  const [loginAction, { error: mutationError }] = useMutation(LoginDocument);

  const client = useApolloClient();

  const {
    data: meData,
    loading: meLoading,
    refetch: meRefetch,
  } = useQuery(MeDocument, {
    skip: !isAuthenticated(),
  });

  const [loginLoading, setLoginLoading] = React.useState(false);

  const login = React.useCallback(
    async (username: string, password: string) => {
      setLoginLoading(true);
      try {
        const { data } = await loginAction({
          variables: {
            input: {
              username,
              password,
            },
          },
        });
        if (data) {
          const { token } = data.login;
          window.localStorage.setItem('token', token);
          await meRefetch();
        }
      } catch {
        localStorage.removeItem('token');
      } finally {
        setLoginLoading(false);
      }
    },
    [loginAction, meRefetch]
  );

  const logout = React.useCallback(() => {
    window.localStorage.removeItem('token');
    client.resetStore();
    window.location.reload();
  }, [client]);

  useDisplayGraphQLErrors(mutationError);

  const value = React.useMemo(
    () => ({
      login,
      logout,
      currentUser: meData?.me,
      loading: meLoading,
      loginLoading,
      loginError: mutationError,
    }),
    [login, logout, meData, meLoading, loginLoading, mutationError]
  );

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};
