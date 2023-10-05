import { gql } from '@apollo/client';

export const PAYMENT_LIST_ITEM_FRAGMENT = gql`
  fragment PaymentListItem on Payment {
    id
    counter
    member {
      id
      name
      surname
    }
    fee {
      id
      name
      type
    }
    amount
    month
  }
`;

export const PAYMENT_DETAIL_FRAGMENT = gql`
  fragment PaymentDetail on Payment {
    ...PaymentListItem
  }
  ${PAYMENT_LIST_ITEM_FRAGMENT}
`;

export const PAYMENTS_QUERY = gql`
  query Payments($pageIndex: Int!, $pageSize: Int!, $filter: PaymentFilter) {
    payments(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
      data {
        ...PaymentListItem
      }
      pageInfo {
        total
      }
    }
  }
  ${PAYMENT_LIST_ITEM_FRAGMENT}
`;

export const PAYMENT_QUERY = gql`
  query Payment($id: ID!) {
    payment(id: $id) {
      ...PaymentDetail
    }
  }
  ${PAYMENT_DETAIL_FRAGMENT}
`;

export const PAYMENT_CREATE_MUTATION = gql`
  mutation PaymentCreate($input: PaymentCreateInput!) {
    paymentCreate(input: $input) {
      payment {
        ...PaymentDetail
      }
    }
  }
  ${PAYMENT_DETAIL_FRAGMENT}
`;
