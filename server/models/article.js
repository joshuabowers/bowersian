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
schema.index({ title: 'text', body: 'text', tags: 'text', slug: 'text' });

schema.pre('save', async function() {
  if( this.isModified('title') || !this.slug ){
    this.slug = await slug( this.title, { lower: true } );
  }
})

schema.statics.updateOneByIdWithSet = async function( id, attributes ) {
  const original = await this.findById( id ).exec();
  original.set( {...attributes} );
  return await original.save();
}

schema.virtual('published')
  .get(function() { return !!this.publishedAt; })
  .set(function(v) { 
    if( v ){
      if(!this.publishedAt){
        this.publishedAt = new Date();
      }  
    } else {
      this.publishedAt = null;
    }
  });

schema.virtual('uri')
  .get(function() {
    if( !this.publishedAt ){ return null; }
    const month = this.publishedAt.getMonth() + 1;
    return [
      '/articles',
      this.publishedAt.getFullYear(),
      month.toString().padStart(2, '0'),
      this.slug
    ].join('/')
  })

schema.query.published = function() {
  return this.where('publishedAt').lte( new Date() );
}

// NOTE: date expected to be { year: Int, month: Int }
schema.query.availableDuring = function( availablity, date ) {
  switch( availablity ){
    case "ALL":
      break;
    case "PUBLISHED":
      this.publishedDuring( date && date.year, date && date.month )
      break;
    case "UNPUBLISHED":
      this.or([
        {"publishedAt": undefined},
        {"publishedAt": {"$gt": new Date()}}
      ])
      break;
  }
  return this;
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

export const Article = mongoose.model( 'Article', schema );