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

schema.index({ publishedAt: 1, slug: 1 });

schema.pre('save', async function() {
  if( this.isModified('title') || !this.slug ){
    this.slug = await slug( this.title, { lower: true } );
  }
})

schema.statics.byDate = function(year, month) {
  const startOfMonth = new Date( year, month, 1 );
  const endOfMonth = new Date( year, month + 1, 0 );
  return this.gte( startOfMonth ).lt( endOfMonth );
}

schema.statics.bySlug = function(slug) {
  return this.find({ slug: slug });
}

export const Article = mongoose.model( 'Article', schema );