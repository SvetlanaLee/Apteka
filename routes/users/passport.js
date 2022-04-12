const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { User } = require('../../db/models');

module.exports = function auth(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secret';
  // opts.issuer = 'accounts.examplesoft.com';
  // opts.audience = 'yoursite.net';
  passport.use(new JwtStrategy(opts, ((jwt_payload, done) => {
    User.findOne({ id: jwt_payload.sub }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
      // or you could create a new account
    });
  })));
};
