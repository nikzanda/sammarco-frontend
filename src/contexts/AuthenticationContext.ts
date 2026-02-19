import React from 'react';
import { ErrorLike } from '@apollo/client';
import { MeQuery } from '../gql/graphql';

export interface IAuthenticationContext {
  loading: boolean;
  currentUser?: MeQuery['me'];
  login: (username: string, password: string) => Promise<void>;
  loginLoading: boolean;
  loginError?: ErrorLike;
  logout: () => void;
}

export const AuthenticationContext = React.createContext<IAuthenticationContext>({
  loading: false,
  login: async () => {},
  loginLoading: false,
  logout: () => {},
});
