import { gql } from '@apollo/client';

export const FEE_LIST_ITEM_FRAGMENT = gql`
  fragment FeeListItem on Fee {
    id
    name
    course {
      id
      name
    }
    amount
    enabled
  }
`;

export const FEE_DETAIL_FRAGMENT = gql`
  fragment FeeDetail on Fee {
    ...FeeListItem
    recurrence
    reason
    createdAt
    updatedAt
    canDelete
  }
  ${FEE_LIST_ITEM_FRAGMENT}
`;

export const FEES_SEARCH_QUERY = gql`
  query FeesSearcher($filter: FeeFilter) {
    fees(pageIndex: 0, pageSize: 20, filter: $filter) {
      data {
        id
        name
        amount
        recurrence
        reason
        course {
          name
        }
      }
    }
  }
`;

export const FEE_SEARCH_QUERY = gql`
  query FeeSearcher($id: ID!) {
    fee(id: $id) {
      id
      name
      amount
      recurrence
      reason
      course {
        name
      }
    }
  }
`;

export const FEES_QUERY = gql`
  query Fees($pageIndex: Int!, $pageSize: Int!, $filter: FeeFilter) {
    fees(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
      data {
        ...FeeListItem
      }
      pageInfo {
        total
      }
    }
  }
  ${FEE_LIST_ITEM_FRAGMENT}
`;

export const FEE_QUERY = gql`
  query Fee($id: ID!) {
    fee(id: $id) {
      ...FeeDetail
    }
  }
  ${FEE_DETAIL_FRAGMENT}
`;

export const FEE_CREATE_MUTATION = gql`
  mutation FeeCreate($input: FeeCreateInput!) {
    feeCreate(input: $input) {
      fee {
        ...FeeDetail
      }
    }
  }
  ${FEE_DETAIL_FRAGMENT}
`;

export const FEE_UPDATE_MUTATION = gql`
  mutation FeeUpdate($input: FeeUpdateInput!) {
    feeUpdate(input: $input) {
      fee {
        ...FeeDetail
      }
    }
  }
  ${FEE_DETAIL_FRAGMENT}
`;

export const FEE_DELETE_MUTATION = gql`
  mutation FeeDelete($input: FeeDeleteInput!) {
    feeDelete(input: $input) {
      fee {
        ...FeeDetail
      }
    }
  }
  ${FEE_DETAIL_FRAGMENT}
`;
