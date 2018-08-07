/**
 * Main component.
 * Creates Apollo Client and wraps the application component into the Apollo Provider.
 */
import React, { PureComponent } from 'react';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import defaults from '../../graphql/defaults';
import resolvers from '../../graphql/resolvers';
import typeDefs from '../../graphql/typeDefs';
import App from '../app/App';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: withClientState({ resolvers, defaults, cache, typeDefs }),
});

class Main extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  }
}

export default Main;