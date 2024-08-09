import { gql } from '@apollo/client';

export const VERIFY_EMAIL_SETTINGS = gql`
  mutation VerifyEmailSettings {
    verifyEmailSettings {
      verified
    }
  }
`;

export const SETTING_UPDATE_MUTATION = gql`
  mutation SettingUpdate($input: SettingUpdateInput!) {
    settingUpdate(input: $input) {
      setting {
        emailSettings {
          host
          port
          secure
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
        }
        reminderEmailMonthDay
      }
    }
  }
`;
