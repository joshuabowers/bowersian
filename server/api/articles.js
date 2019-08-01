import express from 'express';
import { Article } from '../models/article.js';
import { requiresAuthentication } from '../authentication.js';

const router = express.Router();

router.get('/:year?/:month?', async ( req, res, next ) => {
  try {
    const articles = await Article.find()
      .publishedDuring( req.params.year, req.params.month )
      .search( req.query.query )
      .paginate( req.query.page )
      .sort( {publishedAt: -1, title: 1} )
      .exec();
    res.json( articles );
  } catch( e ) {
    next( e );
  }
});

router.post('/', 
  requiresAuthentication,
  async ( req, res, next ) => {
    try {
      const article = await Article.create( req.body );
      res.status(201).json( article );
    } catch( e ) {
      next( e );
    }
  }
);

router.get('/:year/:month/:slug', async (req, res, next) => {
  try {
    const article = await Article.findOne()
      .publishedDuring( req.params.year, req.params.month )
      .bySlug( req.params.slug )
      .exec()
    res.json( article );
  } catch( e ) {
    next( e );
  }
})

router.put('/:id', 
  requiresAuthentication,
  async (req, res, next) => {
    try {
      const article = await Article.findByIdAndUpdate( 
        req.params.id, 
        req.body,
        {new: true}
      ).exec();
      res.json( article );
    } catch( e ) {
      next( e );
    }
  }
)

router.delete('/:id', 
  requiresAuthentication,
  async (req, res, next) => {
    try {
      await Article.findByIdAndRemove( req.params.id ).exec();
      res.sendStatus( 204 );
    } catch( e ) {
      next( e );
    }
  }
)

export default router;