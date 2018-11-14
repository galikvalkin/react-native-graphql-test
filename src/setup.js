import React from 'react';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Navigator from './navigator';

// const API_URL = 'localhost:3000/graphql/';
const API_URL = 'fathomless-wildwood-69680.herokuapp.com/graphql/';

let TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJWYWxpayIsImlhdCI6MTU0MjE4MjAyNywiZXhwIjoxNTczNzM5NjI3fQ.LeAGCBShFeJZHPMWRtdJTPXTOJN6CpQfa23wa6JQCT8";
// let TOKEN = null;

const httpLink = createHttpLink({ uri: `http://${API_URL}` });

const middlewareLink = setContext((req, previousContext) => {
  if (TOKEN) {
    return {
      headers: {
        authorization: `Bearer ${TOKEN}`,
      },
    };
  }

  return previousContext;
});

// afterware for responses
const errorLink = onError((data) => {
  console.log('data: ', data);
  if (data.graphQLErrors) {
    console.log('data.graphQLErrors: ', data.graphQLErrors);
    data.graphQLErrors.forEach(({ message }) => {
      console.log({ message });
    });
  }
});

const requestLink = ({ queryOrMutationLink }) =>
  ApolloLink.split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition';
    },
    queryOrMutationLink,
  );

const link = ApolloLink.from([
  errorLink,
  requestLink({
    queryOrMutationLink: middlewareLink.concat(httpLink),
  }),
]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

class Home extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}

export default Home;
