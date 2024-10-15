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
    }
  }
`;

export const SETTING_QUERY = gql`
  query Setting {
    setting {
      emailSettings {
        host
        port
        secure
        name
        email
      }
      emailTextList {
        receipt {
          subject
          body
        }
        reminder {
          subject
          body
        }
        medicalCertificateExpiration {
          subject
          body
        }
      }
      attendancesPerMonthToSendReminder
      daysBeforeMedicalCertificateExpiresToSendEmail
    }
  }
`;
