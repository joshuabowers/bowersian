import express from 'express';
import { Article } from '../models/article.js';

const router = express.Router();

router.get('/:year?/:month?', async ( req, res, next ) => {
  try {
    const articles = await Article.find().exec();
    res.json( articles );
  } catch( e ) {
    next( e );
  }
});

router.post('/', async ( req, res, next ) => {
  try {
    const article = await Article.create( req.body );
    res.status(201).json( article );
  } catch( e ) {
    next( e );
  }
})

router.get('/:year/:month/:slug', async (req, res, next) => {
  try {
    const article = await Article.findOne()
      .byDate( req.params.year, req.params.month )
      .bySlug( req.params.slug )
      .exec()
    res.json( article );
  } catch( e ) {
    next( e );
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate( 
      req.params.id, 
      req.body
    ).exec();
    res.json( article );
  } catch( e ) {
    next( e );
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Article.findByIdAndRemove( req.params.id ).exec();
    res.sendStatus( 204 );
  } catch( e ) {
    next( e );
  }
})

export default router;