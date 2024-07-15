import { gql } from '@apollo/client';

export const VERIFY_EMAIL_SETTINGS = gql`
  mutation VerifyEmailSettings {
    verifyEmailSettings {
      verified
    }
  }
`;

export const USER_UPDATE_MUTATION = gql`
  mutation UserUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      user {
        id
        username
        emailSettings {
          host
          port
          secure
          ignoreTLS
          email
          receiptEmail {
            subject
            body
          }
          reminderEmail {
            subject
            body
          }
        }
      }
    }
  }
`;
