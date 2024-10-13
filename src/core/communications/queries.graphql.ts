import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const SEND_COMMUNICATION_MUTATION = gql`
  mutation SendCommunication($input: SendCommunicationInput!) {
    sendCommunication(input: $input) {
      result
    }
  }
`;
