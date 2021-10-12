const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')
const { validatePassword } = require('../utils/password-utils')

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
}

const verifyCallback = (username, password, done) => {
  User.findOne({ email: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!validatePassword(password, user.password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log("deserizlize: " + user);
    done(err, user);
  });
});

