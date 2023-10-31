import { gql } from '@apollo/client';

export const PAYMENT_LIST_ITEM_FRAGMENT = gql`
  fragment PaymentListItem on Payment {
    id
    counter
    member {
      id
      fullName
    }
    fee {
      id
      name
    }
    amount
    month
    years
  }
`;

export const PAYMENT_DETAIL_FRAGMENT = gql`
  fragment PaymentDetail on Payment {
    ...PaymentListItem
    fee {
      id
      name
      amount
      recurrence
      reason
    }
    date
    reason
    type
  }
  ${PAYMENT_LIST_ITEM_FRAGMENT}
`;

export const PAYMENT_PDF_FRAGMENT = gql`
  fragment PaymentPdf on Payment {
    counter
    date
    amount
    reason
    member {
      name
      surname
      taxCode
      birthday
      address
      parent {
        name
        surname
        taxCode
      }
    }
  }
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

export const PAYMENTS_PDF_QUERY = gql`
  query PaymentsPdf($filter: PaymentFilter!) {
    payments(pageIndex: 0, pageSize: 0, filter: $filter) {
      data {
        ...PaymentPdf
      }
    }
  }
  ${PAYMENT_PDF_FRAGMENT}
`;

export const PAYMENT_PDF_QUERY = gql`
  query PaymentPdf($id: ID!) {
    payment(id: $id) {
      ...PaymentPdf
    }
  }
  ${PAYMENT_PDF_FRAGMENT}
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

export const PAYMENT_UPDATE_MUTATION = gql`
  mutation PaymentUpdate($input: PaymentUpdateInput!) {
    paymentUpdate(input: $input) {
      payment {
        ...PaymentDetail
      }
    }
  }
  ${PAYMENT_DETAIL_FRAGMENT}
`;

export const PAYMENT_DELETE_MUTATION = gql`
  mutation PaymentDelete($input: PaymentDeleteInput!) {
    paymentDelete(input: $input) {
      payment {
        ...PaymentDetail
      }
    }
  }
  ${PAYMENT_DETAIL_FRAGMENT}
`;
