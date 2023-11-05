import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      emailSettings {
        subject
        body
        host
        port
        secure
        ignoreTLS
        email
      }
    }
  }
`;
