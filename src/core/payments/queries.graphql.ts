import { gql } from '@apollo/client';

export const PAYMENT_LIST_ITEM_FRAGMENT = gql`
  fragment PaymentListItem on Payment {
    id
    counter
    fee {
      id
      name
      type
    }
    amount
  }
`;

export const PAYMENT_DETAIL_FRAGMENT = gql`
  fragment PaymentDetail on Payment {
    ...PaymentListItem
  }
  ${PAYMENT_LIST_ITEM_FRAGMENT}
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
