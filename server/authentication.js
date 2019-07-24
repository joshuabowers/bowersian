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
    done(null, user, { message: ''})
  } catch( err ) {
    if( typeof err === 'string' ){
      done( null, false, { message: err } );
    } else {
      done( err );
    }
  }
}));

// Grabs the token from an Auth Bearer header, and verifies it hasn't
// been blacklisted.
// Question: will this actually work the way I expect? Hmm...
export function withBlacklistCheck() {
  const extractor = jwt.ExtractJwt.fromAuthHeaderAsBearerToken();
  return async function(req) {
    try {
      const token = extractor(req);
      if( !token ){ return null; }
      console.log('bearer token found:', token);
      console.log('checking blacklist');
      const blacklisted = await TokenBlacklist.findOne().where({token: token});
      if( blacklisted ){ return null; }
      console.log('token not currently blacklisted: valid!');
      // req.token = token;
      return token;  
    } catch( err ){
      console.error( err );
      return null;
    }
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
  jwtFromRequest: withBlacklistCheck(),
  secretOrKey: JWT_SECRET,
  audience: context.audience,
  issuer: context.issuer,
}, async (claims, done) => {
  try {
    console.info('token claims:', claims);
    const user = await User.findById( claims.sub );
    done( null, user );
  } catch( err ) {
    done( err );
  }
}))