import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
const { ApolloClient, InMemoryCache } = require('@apollo/client');

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri:'http://localhost:4000/'
});

const link = split(({query})=>{
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    ); 
  },
  wsLink,
  httpLink
)




const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});


// const Messages = client.query({
//     query: gql`
//       query messages {
//         messages {
//           userName,
//           contentMessage
//         }
//       }
//     `
//   }).then(result => result);


export default client;