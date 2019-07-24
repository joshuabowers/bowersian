import express from 'express';
import passport from 'passport';
import { User } from '../models/user.js';
import { TokenBlacklist } from '../models/token_blacklist.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, context } from '../authentication.js';

const router = express.Router();

router.post( '/', 
  passport.authenticate('login', {session: false}),
  (req, res) => {
    req.user.token = jwt.sign({
      sub: req.user.id,
    }, JWT_SECRET, {
      expiresIn: '1d',
      ...context
    });
    res.json(req.user);
  }
);

// Touch TokenBlacklist. Should use 'jwt' auth.
router.delete( '/', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    console.info( req );
    res.sendStatus(204);
  }
);

export default router;