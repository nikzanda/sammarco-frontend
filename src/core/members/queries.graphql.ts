import { gql } from '@apollo/client';

export const MEMBER_LIST_ITEM_FRAGMENT = gql`
  fragment MemberListItem on Member {
    id
    name
    surname
  }
`;

export const MEMBER_DETAIL_FRAGMENT = gql`
  fragment MemberDetail on Member {
    ...MemberListItem
  }
  ${MEMBER_LIST_ITEM_FRAGMENT}
`;

export const MEMBERS_QUERY = gql`
  query Members($pageIndex: Int!, $pageSize: Int!, $filter: MemberFilter) {
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

export const MEMBER_CREATE_MUTATION = gql`
  mutation MemberCreate($input: MemberCreateInput!) {
    memberCreate(input: $input) {
      member {
        ...MemberDetail
      }
    }
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;

export const MEMBER_UPDATE_MUTATION = gql`
  mutation MemberUpdate($input: MemberUpdateInput!) {
    memberUpdate(input: $input) {
      member {
        ...MemberDetail
      }
    }
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;
