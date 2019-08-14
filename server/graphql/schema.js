import { gql } from 'apollo-server-express';

export const schema = gql`
directive @isAuthenticated on FIELD_DEFINITION
scalar DateTime

enum Availability {
  ALL
  PUBLISHED
  UNPUBLISHED
}

type User {
  id: ID!
  email: String!
  displayAs: String!
}

type Article {
  id: ID!
  title: String!
  body: String!
  summary: String
  tags: [String!]!
  slug: String!
  uri: String
  createdAt: DateTime!
  updatedAt: DateTime!
  publishedAt: DateTime
}

input IArticle {
  title: String
  body: String
  published: Boolean
}

input IDate {
  year: Int!
  month: Int
}

input ISlug {
  date: IDate!
  slug: String!
}

input IArticleFilter {
  date: IDate
  search: String
  available: Availability! = PUBLISHED
  page: Int = 1
}

type Query {
  """
  Returns the currently logged in user.
  """
  me: User @isAuthenticated

  articles(filter: IArticleFilter): [Article!]!
  article(search: ISlug!): Article
}

type Mutation {
  """
  Create a new session on the server.
  """
  login(email: String!, password: String!): User
  """
  Delete the current session.
  """
  logout: Boolean!

  addArticle(article: IArticle!): Article @isAuthenticated
  editArticle(id: ID!, article: IArticle!): Article @isAuthenticated
  destroyArticle(id: ID!): Boolean! @isAuthenticated
}
`;