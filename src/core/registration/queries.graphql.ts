import { gql } from '@apollo/client';

export const REGISTRATION_REQUEST_MUTATION = gql`
  mutation RegistrationRequest($input: RegistrationRequestInput!) {
    registrationRequest(input: $input) {
      enrollment {
        id
      }
    }
  }
`;
