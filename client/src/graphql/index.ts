import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost';

export const createClient = () => {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    cache,
    credentials: 'include',
    resolvers: {
      User: {
        isLoggedIn() {
          return true;
        }
      },
      Mutation: {
        toggleLoginForm: (_parent, _args, { cache }, _info) => {
          try {
            const query = gql`
              query {
                isLoginVisible @client
              }
            `;

            const previous = cache.readQuery({ query });
            const isLoginVisible = !previous.isLoginVisible;
            cache.writeData({ data: { isLoginVisible } });
            return isLoginVisible;
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
  });

  const data = {
    isLoginVisible: false
  };

  cache.writeData({ data });

  client.onResetStore(async () => await cache.writeData({ data }));

  return client;
};
