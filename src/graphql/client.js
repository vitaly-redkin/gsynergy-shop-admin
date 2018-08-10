/**
 * Application ApolloClient instance to use in the ApolloProvider.
 */
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import defaults from './defaults';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

/**
 * Creates Apollo client to use in the Apollo Provider.
 */
export function createClient() {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    cache,
    link: withClientState({ resolvers, defaults, cache, typeDefs }),
  });
  return client;
}