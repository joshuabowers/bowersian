import express from 'express';
import articles from './articles.js';
import session from './session.js';

const router = express.Router();

router.use('/articles', articles);
router.use('/session', session);

export default router;