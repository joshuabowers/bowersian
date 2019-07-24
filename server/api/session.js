import express from 'express';
import passport from 'passport';
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
  async (req, res) => {
    try {
      // User Agent has requested logout, so blacklist their token to prevent
      // future successful logins with it.
      await TokenBlacklist.create({ token: req.token });

      res.sendStatus(204);
    } catch( err ){
      res.status(500).json({error: err})
    }
  }
);

export default router;