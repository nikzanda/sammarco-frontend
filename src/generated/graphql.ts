import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  members: MemberPagination;
  member: Member;
  payments: PaymentPagination;
  payment: Payment;
  fees: FeePagination;
  fee: Fee;
};


export type QueryMembersArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<MemberFilter>;
};


export type QueryMemberArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentsArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<PaymentFilter>;
};


export type QueryPaymentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFeesArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<FeeFilter>;
};


export type QueryFeeArgs = {
  id: Scalars['ID']['input'];
};

export type PaymentPagination = {
  __typename?: 'PaymentPagination';
  data: Array<Payment>;
  pageInfo: PageInfo;
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['ID']['output'];
  counter: Scalars['Int']['output'];
  member: Member;
  fee: Fee;
  amount: Scalars['Float']['output'];
  date: Scalars['Float']['output'];
  month?: Maybe<Scalars['String']['output']>;
  years?: Maybe<Array<Scalars['Int']['output']>>;
  type: PaymentTypeEnum;
  createdAt: Scalars['Float']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  total: Scalars['Int']['output'];
};

export type MemberPagination = {
  __typename?: 'MemberPagination';
  data: Array<Member>;
  pageInfo: PageInfo;
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  surname: Scalars['String']['output'];
  taxCode: Scalars['String']['output'];
  birthday: Scalars['Float']['output'];
  enrolledAt?: Maybe<Scalars['Float']['output']>;
  payments: Array<Payment>;
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type FeePagination = {
  __typename?: 'FeePagination';
  data: Array<Fee>;
  pageInfo: PageInfo;
};

export type Fee = {
  __typename?: 'Fee';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<FeeTypeEnum>;
  amount: Scalars['Float']['output'];
  enabled: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type PaymentUpdateInput = {
  id: Scalars['ID']['input'];
  amount?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<PaymentTypeEnum>;
};

export type PaymentUpdatePayload = {
  __typename?: 'PaymentUpdatePayload';
  payment: Payment;
};

export type PaymentDeleteInput = {
  id: Scalars['ID']['input'];
};

export type PaymentDeletePayload = {
  __typename?: 'PaymentDeletePayload';
  payment: Payment;
};

export type PaymentCreateInput = {
  memberId: Scalars['ID']['input'];
  feeId: Scalars['ID']['input'];
  amount: Scalars['Float']['input'];
  date: Scalars['Float']['input'];
  type: PaymentTypeEnum;
  month?: InputMaybe<Scalars['String']['input']>;
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type PaymentCreatePayload = {
  __typename?: 'PaymentCreatePayload';
  payment: Payment;
};

export type MemberUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  enrolledAt?: InputMaybe<Scalars['Float']['input']>;
};

export type MemberUpdatePayload = {
  __typename?: 'MemberUpdatePayload';
  member: Member;
};

export type MemberDeleteInput = {
  id: Scalars['ID']['input'];
};

export type MemberDeletePayload = {
  __typename?: 'MemberDeletePayload';
  member: Member;
};

export type MemberCreateInput = {
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  taxCode: Scalars['String']['input'];
  enrolledAt?: InputMaybe<Scalars['Float']['input']>;
};

export type MemberCreatePayload = {
  __typename?: 'MemberCreatePayload';
  member: Member;
};

export type FeeUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FeeUpdatePayload = {
  __typename?: 'FeeUpdatePayload';
  paymentCategory: Fee;
};

export type FeeDeleteInput = {
  id: Scalars['ID']['input'];
};

export type FeeDeletePayload = {
  __typename?: 'FeeDeletePayload';
  paymentCategory: Fee;
};

export type FeeCreateInput = {
  name: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
};

export type FeeCreatePayload = {
  __typename?: 'FeeCreatePayload';
  paymentCategory: Fee;
};

export type PaymentFilter = {
  memberId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<PaymentTypeEnum>;
};

export type MemberFilter = {
  search?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<MemberSortEnum>;
  sortDirection?: InputMaybe<SortDirectionEnum>;
};

export type FeeFilter = {
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<FeeTypeEnum>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum SortDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum PaymentTypeEnum {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum MemberSortEnum {
  CREATED_AT = 'CREATED_AT'
}

export enum FeeTypeEnum {
  FULL_MONTH = 'FULL_MONTH',
  PARTIAL_MONTH = 'PARTIAL_MONTH',
  ENROLLMENT_A = 'ENROLLMENT_A',
  ENROLLMENT_B = 'ENROLLMENT_B',
  ENROLLMENT_C = 'ENROLLMENT_C'
}

export type Mutation = {
  __typename?: 'Mutation';
  paymentUpdate: PaymentUpdatePayload;
  paymentDelete: PaymentDeletePayload;
  paymentCreate: PaymentCreatePayload;
  memberUpdate: MemberUpdatePayload;
  memberDelete: MemberDeletePayload;
  memberCreate: MemberCreatePayload;
  feeUpdate: FeeUpdatePayload;
  feeDelete: FeeDeletePayload;
  feeCreate: FeeCreatePayload;
};


export type MutationPaymentUpdateArgs = {
  input: PaymentUpdateInput;
};


export type MutationPaymentDeleteArgs = {
  input: PaymentDeleteInput;
};


export type MutationPaymentCreateArgs = {
  input: PaymentCreateInput;
};


export type MutationMemberUpdateArgs = {
  input: MemberUpdateInput;
};


export type MutationMemberDeleteArgs = {
  input: MemberDeleteInput;
};


export type MutationMemberCreateArgs = {
  input: MemberCreateInput;
};


export type MutationFeeUpdateArgs = {
  input: FeeUpdateInput;
};


export type MutationFeeDeleteArgs = {
  input: FeeDeleteInput;
};


export type MutationFeeCreateArgs = {
  input: FeeCreateInput;
};

export type FeeListItemFragment = { __typename?: 'Fee', id: string, name: string, type?: FeeTypeEnum | null, amount: number, enabled: boolean };

export type FeeDetailFragment = { __typename?: 'Fee', id: string, name: string, type?: FeeTypeEnum | null, amount: number, enabled: boolean };

export type FeesSearcherQueryVariables = Exact<{
  filter?: InputMaybe<FeeFilter>;
}>;


export type FeesSearcherQuery = { __typename?: 'Query', fees: { __typename?: 'FeePagination', data: Array<{ __typename?: 'Fee', id: string, name: string, amount: number, type?: FeeTypeEnum | null }> } };

export type FeeSearcherQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FeeSearcherQuery = { __typename?: 'Query', fee: { __typename?: 'Fee', id: string, name: string, amount: number, type?: FeeTypeEnum | null } };

export type MemberListItemFragment = { __typename?: 'Member', id: string, name: string, surname: string };

export type MemberDetailFragment = { __typename?: 'Member', id: string, name: string, surname: string };

export type MembersQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<MemberFilter>;
}>;


export type MembersQuery = { __typename?: 'Query', members: { __typename?: 'MemberPagination', data: Array<{ __typename?: 'Member', id: string, name: string, surname: string }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

export type MemberCreateMutationVariables = Exact<{
  input: MemberCreateInput;
}>;


export type MemberCreateMutation = { __typename?: 'Mutation', memberCreate: { __typename?: 'MemberCreatePayload', member: { __typename?: 'Member', id: string, name: string, surname: string } } };

export type MemberUpdateMutationVariables = Exact<{
  input: MemberUpdateInput;
}>;


export type MemberUpdateMutation = { __typename?: 'Mutation', memberUpdate: { __typename?: 'MemberUpdatePayload', member: { __typename?: 'Member', id: string, name: string, surname: string } } };

export type PaymentListItemFragment = { __typename?: 'Payment', id: string, counter: number, amount: number, month?: string | null, member: { __typename?: 'Member', id: string, name: string, surname: string }, fee: { __typename?: 'Fee', id: string, name: string, type?: FeeTypeEnum | null } };

export type PaymentDetailFragment = { __typename?: 'Payment', id: string, counter: number, amount: number, month?: string | null, member: { __typename?: 'Member', id: string, name: string, surname: string }, fee: { __typename?: 'Fee', id: string, name: string, type?: FeeTypeEnum | null } };

export type PaymentsQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<PaymentFilter>;
}>;


export type PaymentsQuery = { __typename?: 'Query', payments: { __typename?: 'PaymentPagination', data: Array<{ __typename?: 'Payment', id: string, counter: number, amount: number, month?: string | null, member: { __typename?: 'Member', id: string, name: string, surname: string }, fee: { __typename?: 'Fee', id: string, name: string, type?: FeeTypeEnum | null } }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

export type PaymentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PaymentQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', id: string, counter: number, amount: number, month?: string | null, member: { __typename?: 'Member', id: string, name: string, surname: string }, fee: { __typename?: 'Fee', id: string, name: string, type?: FeeTypeEnum | null } } };

export type PaymentPdfQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PaymentPdfQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', counter: number, date: number, amount: number, member: { __typename?: 'Member', name: string, surname: string, taxCode: string }, fee: { __typename?: 'Fee', name: string } } };

export type PaymentCreateMutationVariables = Exact<{
  input: PaymentCreateInput;
}>;


export type PaymentCreateMutation = { __typename?: 'Mutation', paymentCreate: { __typename?: 'PaymentCreatePayload', payment: { __typename?: 'Payment', id: string, counter: number, amount: number, month?: string | null, member: { __typename?: 'Member', id: string, name: string, surname: string }, fee: { __typename?: 'Fee', id: string, name: string, type?: FeeTypeEnum | null } } } };

export const FeeListItemFragmentDoc = gql`
    fragment FeeListItem on Fee {
  id
  name
  type
  amount
  enabled
}
    `;
export const FeeDetailFragmentDoc = gql`
    fragment FeeDetail on Fee {
  ...FeeListItem
}
    ${FeeListItemFragmentDoc}`;
export const MemberListItemFragmentDoc = gql`
    fragment MemberListItem on Member {
  id
  name
  surname
}
    `;
export const MemberDetailFragmentDoc = gql`
    fragment MemberDetail on Member {
  ...MemberListItem
}
    ${MemberListItemFragmentDoc}`;
export const PaymentListItemFragmentDoc = gql`
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
export const PaymentDetailFragmentDoc = gql`
    fragment PaymentDetail on Payment {
  ...PaymentListItem
}
    ${PaymentListItemFragmentDoc}`;
export const FeesSearcherDocument = gql`
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

/**
 * __useFeesSearcherQuery__
 *
 * To run a query within a React component, call `useFeesSearcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeesSearcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeesSearcherQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFeesSearcherQuery(baseOptions?: Apollo.QueryHookOptions<FeesSearcherQuery, FeesSearcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeesSearcherQuery, FeesSearcherQueryVariables>(FeesSearcherDocument, options);
      }
export function useFeesSearcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeesSearcherQuery, FeesSearcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeesSearcherQuery, FeesSearcherQueryVariables>(FeesSearcherDocument, options);
        }
export type FeesSearcherQueryHookResult = ReturnType<typeof useFeesSearcherQuery>;
export type FeesSearcherLazyQueryHookResult = ReturnType<typeof useFeesSearcherLazyQuery>;
export type FeesSearcherQueryResult = Apollo.QueryResult<FeesSearcherQuery, FeesSearcherQueryVariables>;
export const FeeSearcherDocument = gql`
    query FeeSearcher($id: ID!) {
  fee(id: $id) {
    id
    name
    amount
    type
  }
}
    `;

/**
 * __useFeeSearcherQuery__
 *
 * To run a query within a React component, call `useFeeSearcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeeSearcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeeSearcherQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFeeSearcherQuery(baseOptions: Apollo.QueryHookOptions<FeeSearcherQuery, FeeSearcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeeSearcherQuery, FeeSearcherQueryVariables>(FeeSearcherDocument, options);
      }
export function useFeeSearcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeeSearcherQuery, FeeSearcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeeSearcherQuery, FeeSearcherQueryVariables>(FeeSearcherDocument, options);
        }
export type FeeSearcherQueryHookResult = ReturnType<typeof useFeeSearcherQuery>;
export type FeeSearcherLazyQueryHookResult = ReturnType<typeof useFeeSearcherLazyQuery>;
export type FeeSearcherQueryResult = Apollo.QueryResult<FeeSearcherQuery, FeeSearcherQueryVariables>;
export const MembersDocument = gql`
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
    ${MemberListItemFragmentDoc}`;

/**
 * __useMembersQuery__
 *
 * To run a query within a React component, call `useMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembersQuery({
 *   variables: {
 *      pageIndex: // value for 'pageIndex'
 *      pageSize: // value for 'pageSize'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMembersQuery(baseOptions: Apollo.QueryHookOptions<MembersQuery, MembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MembersQuery, MembersQueryVariables>(MembersDocument, options);
      }
export function useMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembersQuery, MembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MembersQuery, MembersQueryVariables>(MembersDocument, options);
        }
export type MembersQueryHookResult = ReturnType<typeof useMembersQuery>;
export type MembersLazyQueryHookResult = ReturnType<typeof useMembersLazyQuery>;
export type MembersQueryResult = Apollo.QueryResult<MembersQuery, MembersQueryVariables>;
export const MemberCreateDocument = gql`
    mutation MemberCreate($input: MemberCreateInput!) {
  memberCreate(input: $input) {
    member {
      ...MemberDetail
    }
  }
}
    ${MemberDetailFragmentDoc}`;
export type MemberCreateMutationFn = Apollo.MutationFunction<MemberCreateMutation, MemberCreateMutationVariables>;

/**
 * __useMemberCreateMutation__
 *
 * To run a mutation, you first call `useMemberCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMemberCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [memberCreateMutation, { data, loading, error }] = useMemberCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMemberCreateMutation(baseOptions?: Apollo.MutationHookOptions<MemberCreateMutation, MemberCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MemberCreateMutation, MemberCreateMutationVariables>(MemberCreateDocument, options);
      }
export type MemberCreateMutationHookResult = ReturnType<typeof useMemberCreateMutation>;
export type MemberCreateMutationResult = Apollo.MutationResult<MemberCreateMutation>;
export type MemberCreateMutationOptions = Apollo.BaseMutationOptions<MemberCreateMutation, MemberCreateMutationVariables>;
export const MemberUpdateDocument = gql`
    mutation MemberUpdate($input: MemberUpdateInput!) {
  memberUpdate(input: $input) {
    member {
      ...MemberDetail
    }
  }
}
    ${MemberDetailFragmentDoc}`;
export type MemberUpdateMutationFn = Apollo.MutationFunction<MemberUpdateMutation, MemberUpdateMutationVariables>;

/**
 * __useMemberUpdateMutation__
 *
 * To run a mutation, you first call `useMemberUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMemberUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [memberUpdateMutation, { data, loading, error }] = useMemberUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMemberUpdateMutation(baseOptions?: Apollo.MutationHookOptions<MemberUpdateMutation, MemberUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MemberUpdateMutation, MemberUpdateMutationVariables>(MemberUpdateDocument, options);
      }
export type MemberUpdateMutationHookResult = ReturnType<typeof useMemberUpdateMutation>;
export type MemberUpdateMutationResult = Apollo.MutationResult<MemberUpdateMutation>;
export type MemberUpdateMutationOptions = Apollo.BaseMutationOptions<MemberUpdateMutation, MemberUpdateMutationVariables>;
export const PaymentsDocument = gql`
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
    ${PaymentListItemFragmentDoc}`;

/**
 * __usePaymentsQuery__
 *
 * To run a query within a React component, call `usePaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentsQuery({
 *   variables: {
 *      pageIndex: // value for 'pageIndex'
 *      pageSize: // value for 'pageSize'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePaymentsQuery(baseOptions: Apollo.QueryHookOptions<PaymentsQuery, PaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentsQuery, PaymentsQueryVariables>(PaymentsDocument, options);
      }
export function usePaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentsQuery, PaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentsQuery, PaymentsQueryVariables>(PaymentsDocument, options);
        }
export type PaymentsQueryHookResult = ReturnType<typeof usePaymentsQuery>;
export type PaymentsLazyQueryHookResult = ReturnType<typeof usePaymentsLazyQuery>;
export type PaymentsQueryResult = Apollo.QueryResult<PaymentsQuery, PaymentsQueryVariables>;
export const PaymentDocument = gql`
    query Payment($id: ID!) {
  payment(id: $id) {
    ...PaymentDetail
  }
}
    ${PaymentDetailFragmentDoc}`;

/**
 * __usePaymentQuery__
 *
 * To run a query within a React component, call `usePaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePaymentQuery(baseOptions: Apollo.QueryHookOptions<PaymentQuery, PaymentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentQuery, PaymentQueryVariables>(PaymentDocument, options);
      }
export function usePaymentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentQuery, PaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentQuery, PaymentQueryVariables>(PaymentDocument, options);
        }
export type PaymentQueryHookResult = ReturnType<typeof usePaymentQuery>;
export type PaymentLazyQueryHookResult = ReturnType<typeof usePaymentLazyQuery>;
export type PaymentQueryResult = Apollo.QueryResult<PaymentQuery, PaymentQueryVariables>;
export const PaymentPdfDocument = gql`
    query PaymentPdf($id: ID!) {
  payment(id: $id) {
    counter
    date
    amount
    member {
      name
      surname
      taxCode
    }
    fee {
      name
    }
  }
}
    `;

/**
 * __usePaymentPdfQuery__
 *
 * To run a query within a React component, call `usePaymentPdfQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentPdfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentPdfQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePaymentPdfQuery(baseOptions: Apollo.QueryHookOptions<PaymentPdfQuery, PaymentPdfQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentPdfQuery, PaymentPdfQueryVariables>(PaymentPdfDocument, options);
      }
export function usePaymentPdfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentPdfQuery, PaymentPdfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentPdfQuery, PaymentPdfQueryVariables>(PaymentPdfDocument, options);
        }
export type PaymentPdfQueryHookResult = ReturnType<typeof usePaymentPdfQuery>;
export type PaymentPdfLazyQueryHookResult = ReturnType<typeof usePaymentPdfLazyQuery>;
export type PaymentPdfQueryResult = Apollo.QueryResult<PaymentPdfQuery, PaymentPdfQueryVariables>;
export const PaymentCreateDocument = gql`
    mutation PaymentCreate($input: PaymentCreateInput!) {
  paymentCreate(input: $input) {
    payment {
      ...PaymentDetail
    }
  }
}
    ${PaymentDetailFragmentDoc}`;
export type PaymentCreateMutationFn = Apollo.MutationFunction<PaymentCreateMutation, PaymentCreateMutationVariables>;

/**
 * __usePaymentCreateMutation__
 *
 * To run a mutation, you first call `usePaymentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentCreateMutation, { data, loading, error }] = usePaymentCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentCreateMutation(baseOptions?: Apollo.MutationHookOptions<PaymentCreateMutation, PaymentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PaymentCreateMutation, PaymentCreateMutationVariables>(PaymentCreateDocument, options);
      }
export type PaymentCreateMutationHookResult = ReturnType<typeof usePaymentCreateMutation>;
export type PaymentCreateMutationResult = Apollo.MutationResult<PaymentCreateMutation>;
export type PaymentCreateMutationOptions = Apollo.BaseMutationOptions<PaymentCreateMutation, PaymentCreateMutationVariables>;