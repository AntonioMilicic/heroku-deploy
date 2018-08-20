require('dotenv').config({path: '../../.env'});
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const models = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.user.findOne({where: id})
    .then((user) => {
      done(null, user);
    });
});
passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    models.user.findOne({
      where: {
        googleID: profile.id
      }
    }).then((user) => {
      if (!user) {
        models.user.create({
          username: profile.displayName,
          googleID: profile.id,
          email: profile.emails[0].value
        })
          .then((newUser) => {
            done(null, newUser);
          });
      } else {
        done(null, user);
      }
    });
  })
);
passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/redirect',
    profileFields: ['id', 'emails', 'name']
  },
  function (accessToken, refreshToken, profile, done) {
    models.user.findOne({
      where: {
        facebookID: profile.id
      }
    }).then((user) => {
      if (!user) {
        models.user.create({
          username: profile.name.givenName,
          facebookID: profile.id,
          email: profile.emails[0].value
        })
          .then((newUser) => {
            done(null, newUser);
          });
      } else {
        done(null, user);
      }
    });
  })
);
