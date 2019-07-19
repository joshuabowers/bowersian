import express from 'express';
import articles from './articles.js';

const router = express.Router();

router.use('/articles', articles);

export default router;