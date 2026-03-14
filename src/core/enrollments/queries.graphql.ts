import { gql } from '@apollo/client';

export const ENROLLMENT_LIST_ITEM_FRAGMENT = gql`
  fragment EnrollmentListItem on Enrollment {
    id
    member {
      id
      fullName
    }
    socialYear
    status
    courses {
      id
      name
      shifts {
        id
        from
        to
      }
    }
    shiftIds
    qualification
    socialCardNumber
    medicalCertificateExpireAt
    excludeFromCommunications
    payments {
      id
      month
    }
    attendances {
      id
      course {
        id
      }
      from
      to
    }
  }
`;

export const ENROLLMENT_DETAIL_FRAGMENT = gql`
  fragment EnrollmentDetail on Enrollment {
    ...EnrollmentListItem
    shiftIds
    asiCardNumber
    csenCardNumber
    registrationRequestDate
    registrationAcceptanceDate
    medicalCertificateType
    medicalCertificateKey
    consents {
      type
      acceptedAt
    }
    excludeFromCommunications
    createdAt
    updatedAt
  }
  ${ENROLLMENT_LIST_ITEM_FRAGMENT}
`;

export const ENROLLMENTS_PENDING_COUNT_QUERY = gql`
  query EnrollmentsPendingCount($filter: EnrollmentFilter) {
    enrollments(pageIndex: 0, pageSize: 1, filter: $filter) {
      pageInfo {
        total
      }
    }
  }
`;

export const ENROLLMENTS_QUERY = gql`
  query Enrollments($pageIndex: Int!, $pageSize: Int!, $filter: EnrollmentFilter) {
    enrollments(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
      data {
        ...EnrollmentListItem
      }
      pageInfo {
        total
      }
    }
  }
  ${ENROLLMENT_LIST_ITEM_FRAGMENT}
`;

export const ENROLLMENT_QUERY = gql`
  query Enrollment($id: ID!) {
    enrollment(id: $id) {
      ...EnrollmentDetail
    }
  }
  ${ENROLLMENT_DETAIL_FRAGMENT}
`;

export const ENROLLMENT_CREATE_MUTATION = gql`
  mutation EnrollmentCreate($input: EnrollmentCreateInput!) {
    enrollmentCreate(input: $input) {
      enrollment {
        ...EnrollmentDetail
      }
    }
  }
  ${ENROLLMENT_DETAIL_FRAGMENT}
`;

export const ENROLLMENT_UPDATE_MUTATION = gql`
  mutation EnrollmentUpdate($input: EnrollmentUpdateInput!) {
    enrollmentUpdate(input: $input) {
      enrollment {
        ...EnrollmentDetail
      }
    }
  }
  ${ENROLLMENT_DETAIL_FRAGMENT}
`;

export const ENROLLMENT_DELETE_MUTATION = gql`
  mutation EnrollmentDelete($input: EnrollmentDeleteInput!) {
    enrollmentDelete(input: $input) {
      enrollment {
        ...EnrollmentDetail
      }
    }
  }
  ${ENROLLMENT_DETAIL_FRAGMENT}
`;

export const ENROLLMENT_CONFIRM_MUTATION = gql`
  mutation EnrollmentConfirm($input: EnrollmentConfirmInput!) {
    enrollmentConfirm(input: $input) {
      modifiedCount
    }
  }
`;
