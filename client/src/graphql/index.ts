import ApolloClient from 'apollo-boost';

export const createClient = () => {
  return new ApolloClient({
    credentials: 'include'
  });
};
