import { gql } from 'apollo-server-express';

export const schema = gql`
type User {
  id: ID!
  email: String!
  password: String
  displayAs: String!
}

type Article {
  id: ID!
  title: String!
  body: String!
  summary: String
  tags: [String!]!
}

type Query {
  me: User
}
`;