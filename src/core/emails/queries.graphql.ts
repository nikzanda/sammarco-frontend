import { gql } from '@apollo/client';

export const EMAILS_QUERY = gql`
  query Emails($pageIndex: Int!, $pageSize: Int!, $filter: EmailFilter) {
    emails(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
      data {
        id
        course {
          name
        }
        type
        to
        subject
        body
        createdAt
      }
      pageInfo {
        total
      }
    }
  }
`;

export const SEND_REMINDER_MUTATION = gql`
  mutation PaymentSendReminder($input: PaymentSendReminderInput!) {
    paymentSendReminder(input: $input) {
      email {
        id
      }
    }
  }
`;

export const SEND_MONTHLY_REMINDERS_MUTATION = gql`
  mutation SendMonthlyReminders($input: SendMonthlyRemindersInput!) {
    sendMonthlyReminders(input: $input) {
      sentReminders
    }
  }
`;
