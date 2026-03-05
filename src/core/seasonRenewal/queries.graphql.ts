import { gql } from '@apollo/client';

export const COPY_COURSES_MUTATION = gql`
  mutation CopyCourses($input: CopyCoursesInput!) {
    copyCourses(input: $input) {
      createdCount
    }
  }
`;

export const COPY_FEES_MUTATION = gql`
  mutation CopyFees($input: CopyFeesInput!) {
    copyFees(input: $input) {
      createdCount
    }
  }
`;

export const SEASON_RENEW_MUTATION = gql`
  mutation SeasonRenew($input: SeasonRenewInput!) {
    seasonRenew(input: $input) {
      createdCount
    }
  }
`;
