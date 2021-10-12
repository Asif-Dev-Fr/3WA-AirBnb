// * WITH LOCAL STRATEGY

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/User')
// const { validatePassword } = require('../utils/password-utils')

// const customFields = {
//   usernameField: 'email',
//   passwordField: 'password'
// }

// const verifyCallback = (username, password, done) => {
//   User.findOne({ email: username }, function(err, user) {
//     if (err) { return done(err); }
//     if (!user) {
//       return done(null, false, { message: 'Incorrect username.' });
//     }
//     if (!validatePassword(password, user.password)) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }
//     return done(null, user);
//   });
// };

// const strategy = new LocalStrategy(customFields, verifyCallback);

// passport.use(strategy);

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     console.log("deserizlize: " + user);
//     done(err, user);
//   });
// });

// * WITH JWT STRATEGY
const fs = require('fs');
const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}
const strategy = new JwtStrategy(options, (payload, done) => {
  console.log('payload.sub', payload.sub);
  User.findOne({ _id: payload.sub })
      .then((user) => {
        console.log('USER:::', user);
        if(user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
      .catch(err => done(err, null))
})

module.exports = (passport) => {
  passport.use(strategy)
}
