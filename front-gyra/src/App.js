import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import {ApolloProvider} from '@apollo/client';

const client = require('./api-graphql/api').default;

const App = () => {
  return (
      <Router>
        <Route path='/' exact component={Join} />
      <ApolloProvider client={client}>
        <Route path='/chat' component={Chat} />
      </ApolloProvider>

      </Router>
  )
}

export default App;