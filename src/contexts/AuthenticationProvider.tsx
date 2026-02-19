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
  const [loginAction, { loading: mutationLoading, data: mutationData, error: mutationError }] =
    useMutation(LoginDocument);

  const client = useApolloClient();

  const {
    data: meData,
    loading: meLoading,
    refetch: meRefetch,
  } = useQuery(MeDocument, {
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
