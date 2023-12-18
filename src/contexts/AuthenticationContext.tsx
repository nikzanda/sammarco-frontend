import React from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useApolloClient } from '@apollo/client';
import { MeQuery, useLoginMutation, useMeQuery } from '../generated/graphql';

interface IAuthenticationContext {
  loading?: boolean;
  currentUser?: MeQuery['me'];
  login?: (username: string, password: string) => Promise<void>;
  logout?: () => void;
}

type Props = {
  children: React.ReactNode;
};

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

export const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const [loginAction, { loading: mutationLoading, data: mutationData, error: mutationError }] = useLoginMutation();

  const client = useApolloClient();

  // const [getMe, { loading: meLoading, data: meData }] = useMeLazyQuery();
  const {
    loading: meLoading,
    data: meData,
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
      };
    }
    return {
      login,
      logout,
      loading: meLoading,
    };
  }, [login, logout, meData, meLoading]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export const { Consumer: AuthenticationConsumer } = AuthenticationContext;
