import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';
import { onError } from '@apollo/client/link/error';

const cleanTypeName = new ApolloLink((operation, forward) => {
  // ATTENZIONE: https://github.com/apollographql/apollo-feature-requests/issues/6#issuecomment-462071544
  const def = getMainDefinition(operation.query);

  if (def && (def as OperationDefinitionNode).operation === 'mutation') {
    const omitTypename = (key: string, value: any) => (key === '__typename' ? undefined : value);
    // eslint-disable-next-line no-param-reassign
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
  }

  return forward ? forward(operation) : null;
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // if (networkError && networkError.statusCode === 401) {
  //   window.localStorage.removeItem('token');
  //   window.location.replace('/');
  // }
  // else if (graphQLErrors) {
  //   // eslint-disable-next-line no-console
  //   graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  // }
  // eslint-disable-next-line no-console
  console.error(networkError);
});

const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPHQLURI });

const httpCompositeLink = ApolloLink.from([
  cleanTypeName,
  errorLink,
  // authLink, TODO: authenticate
  httpLink,
]);

const apolloClient = new ApolloClient({
  link: httpCompositeLink,
  cache: new InMemoryCache({
    // possibleTypes: introspectionResult.possibleTypes,
  }),
});

export default apolloClient;
