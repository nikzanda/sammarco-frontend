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
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
  }

  return forward ? forward(operation) : null;
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions, locations, path }) => {
      if (extensions?.code === 'UNAUTHORIZED') {
        window.localStorage.removeItem('token');
        window.location.replace('/');
      }

      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(networkError);
  }
});

const httpLink = createHttpLink({ uri: import.meta.env.VITE_GRAPHQLURI });

const httpCompositeLink = ApolloLink.from([cleanTypeName, errorLink, authLink, httpLink]);

const apolloClient = new ApolloClient({
  link: httpCompositeLink,
  // TODO: in locale la cache va, in produzione no, perché?
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only',
    },
  },
  cache: new InMemoryCache({
    // possibleTypes: introspectionResult.possibleTypes,
  }),
});

export default apolloClient;
