import { gql } from '@apollo/client';

export const SEND_COMMUNICATION_MUTATION = gql`
  mutation SendCommunication($input: SendCommunicationInput!) {
    sendCommunication(input: $input) {
      result
    }
  }
`;
