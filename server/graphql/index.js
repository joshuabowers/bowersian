import { ApolloServer } from 'apollo-server-express';
import { buildContext } from 'graphql-passport';

import { schema } from './schema.js';
import { resolvers } from './resolvers.js';
import { IsAuthenticatedDirective } from './directives/IsAuthenticatedDirective.js';

export const createApolloServer = (app) => {
  const server =  new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req, res }) => buildContext({ req, res }),
    schemaDirectives: {
      isAuthenticated: IsAuthenticatedDirective
    }
  });
  server.applyMiddleware({ app });
  return server;
}