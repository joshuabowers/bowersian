import mongoose from 'mongoose';
import slug from 'slug';

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  summary: String,
  tags: [String],
  topics: [String],
  slug: String,
  publishedAt: Date
}, { timestamps: true });

// Note: slug might be an interesting addition to the text index:
// while it replicates title, it does handle unicode emoji conversion,
// so, heart emoji gets translated to 'love'. Might make certain searches
// easier.
schema.index({ publishedAt: 1, slug: 1 });
schema.index({ title: 'text', body: 'text', tags: 'text' });

schema.pre('save', async function() {
  if( this.isModified('title') || !this.slug ){
    this.slug = await slug( this.title, { lower: true } );
  }
})

schema.query.published = function() {
  return this.where('publishedAt').lte( new Date() );
}

schema.query.publishedDuring = function(year, month) {
  const query = this.published();
  if( year && !month ){
    query.withinYear( year );
  } else if ( year && month ){
    query.withinMonth( year, month );
  }
  return query;
}

schema.query.withinRange = function( start, end ) {
  return this.where('publishedAt').gte( start ).lt( end );
}

schema.query.withinYear = function(year) {
  const y = parseInt(year);
  const startOfYear = new Date( Date.UTC( y, 0, 1 ) );
  const endOfYear = new Date( Date.UTC( y + 1, 0, 1, 0, 0, -1 ) );
  return this.withinRange( startOfYear, endOfYear );
}

schema.query.withinMonth = function(year, month) {
  // Date treats months as 0-based, so decrementing to properly index.
  const [ y, m ] = [ parseInt(year), parseInt(month) - 1 ];
  const startOfMonth = new Date( Date.UTC( y, m, 1 ) );
  const endOfMonth = new Date( Date.UTC( y, m + 1, 1, 0, 0, -1 ) );
  return this.withinRange( startOfMonth, endOfMonth );
}

schema.query.bySlug = function(slug) {
  return this.where({ slug: slug });
}

schema.query.search = function(query) {
  if( !query ){ return this; }
  return this.find({ '$text': { '$search': query } });
}

// Page numbers expected to be positive values >= 1
schema.query.paginate = function(page) {
  if( !page ){ return this; }
  const perPage = 25;
  const p = Math.max( 0, parseInt(page) - 1 ) * perPage;
  return this.limit( perPage ).skip( p );
}

schema.set( 'toJSON', {
  transform: function( doc, ret, options ){
    const month = ret.publishedAt.getMonth() + 1;
    return {
      id: ret.id,
      title: ret.title,
      body: ret.body,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
      publishedAt: ret.publishedAt,
      slug: ret.slug,
      tags: ret.tags,
      topics: ret.topics,
      uri: [
        '/articles',
        ret.publishedAt.getFullYear(),
        month.toString().padStart(2, '0'),
        ret.slug
      ].join('/')
    }
  },
  virtuals: true
} )

export const Article = mongoose.model( 'Article', schema );