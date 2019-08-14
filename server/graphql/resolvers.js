import { Article } from '../models/article.js'
import { AuthenticationError } from 'apollo-server-core';
import { GraphQLDateTime } from 'graphql-iso-date';

export const resolvers = {
  Query: {
    me: (_, _args, context) => context.user,

    // TODO: Implement pagination correctly using cursors
    articles: async (_, {filter: { date, search, available } = {}}, _context) => {
      const query = Article.find()
        .search( search )
        // .paginate( req.query.page )
        .sort( {publishedAt: -1, title: 1} );

      switch( available ){
        case "ALL":
          break;
        case "PUBLISHED":
          query.publishedDuring( date && date.year, date && date.month )
          break;
        case "UNPUBLISHED":
          query.where('publishedAt', undefined);
          break;
      }

      return await query.exec();
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
      context.logout();
      return true;
    },

    addArticle: async (_, { article }, _context) => {
      return await Article.create({ ...article });
    },
    editArticle: async (_, { id, article }, _context) => {
      const original = await Article.findById( id ).exec();
      original.set( {...article} );
      return await original.save();
    },
    destroyArticle: async (_, { id }, _context) => {
      return Article.findByIdAndRemove( id ).exec();
    }
  },
  Article: {
    uri: (parent, _args, _context) => {
      if( !parent.publishedAt ){ return null; }
      const month = parent.publishedAt.getMonth() + 1;
      return [
        '/articles',
        parent.publishedAt.getFullYear(),
        month.toString().padStart(2, '0'),
        parent.slug
      ].join('/')
    }
  },
  DateTime: GraphQLDateTime
}