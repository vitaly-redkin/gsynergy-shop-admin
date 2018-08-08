/**
 * Main component.
 * Creates Apollo Client and wraps the application component into the Apollo Provider.
 */
import React, { PureComponent } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from '../../graphql/client';
import App from '../app/App';

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