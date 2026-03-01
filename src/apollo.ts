import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { SetContextLink } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';
import { OperationDefinitionNode } from 'graphql';
import { ErrorLink } from '@apollo/client/link/error';
import { CombinedGraphQLErrors } from '@apollo/client/errors';

const authLink = new SetContextLink(({ headers }) => {
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

  return forward(operation);
});

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, extensions, locations, path }) => {
      if (extensions?.code === 'UNAUTHORIZED') {
        window.localStorage.removeItem('token');
        window.location.replace('/');
      }

      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  } else {
    console.error(error);
  }
});

const httpLink = new HttpLink({ uri: import.meta.env.VITE_GRAPHQLURI });

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
      notifyOnNetworkStatusChange: false,
    },
  },
  cache: new InMemoryCache({
    // possibleTypes: introspectionResult.possibleTypes,
  }),
});

export default apolloClient;
