import { Article } from '../models/article.js'
import { AuthenticationError } from 'apollo-server-core';
import { GraphQLDateTime } from 'graphql-iso-date';

export const resolvers = {
  Query: {
    me: (_, _args, context) => context.user,

    // TODO: Implement pagination correctly using cursors
    articles: async (_, {filter: { date, search, available } = {}}, _context) => {
      return await Article.find()
        .availableDuring( available, date )
        .search( search )
        // .paginate( req.query.page )
        .sort( {publishedAt: -1, title: 1} )
        .exec();
    },

    article: async (_, {search: { date, slug } = {}}, _context) => {
      return await Article.findOne()
        .publishedDuring( date.year, date.month )
        .bySlug( slug )
        .exec()
    }
  },
  Mutation: {
    login: async (_, { email, password }, context) => {
      const { user } = await context.authenticate('graphql-local', { email, password });
      if( !user ){ throw new AuthenticationError( 'Login unsuccessful' ); }
      context.login(user);
      return user;
    },

    logout: async (_, _args, context) => {
      await context.logout();
      return true;
    },

    addArticle: async (_, { article }, _context) => {
      return await Article.create({ ...article });
    },
    editArticle: async (_, { id, article }, _context) => {
      return await Article.updateOneByIdWithSet( id, article );
    },
    destroyArticle: async (_, { id }, _context) => {
      return (await Article.findByIdAndRemove( id ).exec()) && true;
    }
  },
  DateTime: GraphQLDateTime
}