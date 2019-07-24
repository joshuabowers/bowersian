import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import { User } from './models/user.js';
import { TokenBlacklist } from './models/token_blacklist.js';

passport.use('login', new local.Strategy({
  usernameField: 'email',
  session: false
}, async (email, password, done) => {
  try {
    const user = await User.authenticate(email, password);
    done(null, user, { message: 'Login successful'})
  } catch( err ) {
    if( typeof err === 'string' ){
      done( null, false, { message: err } );
    } else {
      done( err );
    }
  }
}));

// Looks for an Auth Bearer token; if found, caches result in req.token
export function withTokenCache() {
  const extractor = jwt.ExtractJwt.fromAuthHeaderAsBearerToken();
  return function(req) {
    req.token = extractor(req);
    return req.token;  
  }  
}

export const JWT_SECRET = process.env.SECRET_KEY_BASE || 'secret';
export const context = {
  audience: 'bowersian',
  issuer: 'bowersian.herokuapp.com'
};

// Note: JWT payload fairly simple: Sub claim is just User model id.
// Does require a DB fetch, but the endpoints require that anyway, 
// so meh?
passport.use('jwt', new jwt.Strategy({
  jwtFromRequest: withTokenCache(),
  secretOrKey: JWT_SECRET,
  audience: context.audience,
  issuer: context.issuer,
  passReqToCallback: true
}, async (req, claims, done) => {
  try {
    const blacklisted = await TokenBlacklist.findOne().where({token: req.token});
    if( blacklisted ){ return done( null, false ); }

    const user = await User.findById( claims.sub );
    done( null, user );
  } catch( err ) {
    done( err );
  }
}))