import { gql } from '@apollo/client';

export const FEE_LIST_ITEM_FRAGMENT = gql`
  fragment FeeListItem on Fee {
    id
    name
    type
    amount
    enabled
  }
`;

export const FEE_DETAIL_FRAGMENT = gql`
  fragment FeeDetail on Fee {
    ...FeeListItem
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
        type
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
      type
    }
  }
`;
