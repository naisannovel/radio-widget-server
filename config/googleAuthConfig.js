const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { GoogleUser, validate } = require('../models/googleUserModel');
const _ = require('lodash');

const GOOGLE_CLIENT_ID = '607238272249-j1irhietdnhfigui0uvuqmaihndldru7.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function (accessToken, refreshToken, profile, cb) {

    let user = await GoogleUser.findOne({
      googleId: profile.id,
      email: profile._json.email
    })
    if (user) {
      const token = user.generateJWT();
      cb(null, token)
    } else {
      user = new GoogleUser({
        googleId: profile.id,
        email: profile._json.email,
        name: profile.displayName
      })

      try {
        const result = await user.save();
        if(result._id){
          const token = user.generateJWT();
          cb(null, token)
        }
      } catch (error) {
        return response.status(400).send('unknown error')
      }
    }
  }
));