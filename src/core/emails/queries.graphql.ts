import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const EMAILS_QUERY = gql`
  query Emails($pageIndex: Int!, $pageSize: Int!, $filter: EmailFilter) {
    emails(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
      data {
        id
        course {
          name
        }
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
