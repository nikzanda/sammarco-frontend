import { gql } from '@apollo/client';

export const MEMBER_LIST_ITEM_FRAGMENT = gql`
  fragment MemberListItem on Member {
    id
    fullName
    payments(years: $years) {
      id
      month
      years
    }
    attendances(years: $years) {
      id
      course {
        id
      }
      from
      to
    }
    courses {
      id
      name
      shifts {
        id
        from
        to
      }
    }
    medicalCertificate {
      expireAt
    }
    currentMonthReminderEmails {
      id
    }
    shiftIds
  }
`;

export const MEMBER_DETAIL_FRAGMENT = gql`
  fragment MemberDetail on Member {
    ...MemberListItem
    name
    surname
    taxCode
    address
    qualification
    email
    registrationRequestDate
    registrationAcceptanceDate
    socialCardNumber
    asiCardNumber
    csenCardNumber
    parent {
      name
      surname
      taxCode
    }
    shiftIds
    medicalCertificate {
      base64
      expireAt
    }
    canDelete
    createdAt
    updatedAt
  }
  ${MEMBER_LIST_ITEM_FRAGMENT}
`;

export const MEMBERS_SEARCH_QUERY = gql`
  query MembersSearcher($filter: MemberFilter) {
    members(pageIndex: 0, pageSize: 20, filter: $filter) {
      data {
        id
        fullName
        email
      }
    }
  }
`;

export const MEMBER_SEARCH_QUERY = gql`
  query MemberSearcher($id: ID!) {
    member(id: $id) {
      id
      fullName
      email
    }
  }
`;

export const MEMBERS_QUERY = gql`
  query Members($pageIndex: Int!, $pageSize: Int!, $filter: MemberFilter, $years: [Int!]) {
    members(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
      data {
        ...MemberListItem
      }
      pageInfo {
        total
      }
    }
  }
  ${MEMBER_LIST_ITEM_FRAGMENT}
`;

export const MEMBER_QUERY = gql`
  query Member($id: ID!, $years: [Int!]) {
    member(id: $id) {
      ...MemberDetail
    }
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;

export const MEMBERS_CSV_QUERY = gql`
  query MembersCsv($years: [Int!]!, $filter: MemberFilter) {
    members(pageIndex: 0, pageSize: 0, filter: $filter) {
      data {
        socialCardNumber
        registrationRequestDate
        registrationAcceptanceDate
        fullName
        birthday
        taxCode
        address
        qualification
        paidMembershipFee(years: $years)
        csenCardNumber
        asiCardNumber
      }
    }
  }
`;

export const MEMBERS_SYNC_QUERY = gql`
  query MembersSync($ids: [ID!]!) {
    members(pageIndex: 0, pageSize: 0, filter: { ids: $ids }) {
      data {
        id
        name
        surname
        taxCode
        address
        qualification
        email
        asiCardNumber
        csenCardNumber
        parent {
          name
          surname
          taxCode
        }
        courses {
          id
        }
        shiftIds
        medicalCertificate {
          base64
          expireAt
        }
      }
    }
  }
`;

export const MEMBER_CREATE_MUTATION = gql`
  mutation MemberCreate($input: MemberCreateInput!, $years: [Int!]) {
    memberCreate(input: $input) {
      member {
        ...MemberDetail
      }
    }
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;

export const MEMBER_UPDATE_MUTATION = gql`
  mutation MemberUpdate($input: MemberUpdateInput!, $years: [Int!]) {
    memberUpdate(input: $input) {
      member {
        ...MemberDetail
      }
    }
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;

export const MEMBER_DELETE_MUTATION = gql`
  mutation MemberDelete($input: MemberDeleteInput!, $years: [Int!]) {
    memberDelete(input: $input) {
      member {
        ...MemberDetail
      }
    }
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;
