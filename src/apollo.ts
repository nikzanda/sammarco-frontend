import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { OperationDefinitionNode } from 'graphql';
import { onError } from '@apollo/client/link/error';

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('token');
  const authHeaders: {
    authorization: string | undefined;
  } = {
    authorization: undefined,
  };
  if (token) {
    authHeaders.authorization = `Bearer ${token}`;
  }
  return {
    headers: {
      ...headers,
      ...authHeaders,
    },
  };
});

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
  if (networkError) {
    // eslint-disable-next-line no-console
    console.error('networkError:', networkError);
  }
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
});

const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPHQLURI });

const httpCompositeLink = ApolloLink.from([cleanTypeName, errorLink, authLink, httpLink]);

const apolloClient = new ApolloClient({
  link: httpCompositeLink,
  cache: new InMemoryCache({
    // possibleTypes: introspectionResult.possibleTypes,
  }),
});

export default apolloClient;
