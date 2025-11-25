const passport = require("passport");
// const User= require('..//models/user_models');
var GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.Client_id,
    clientSecret: process.env.Client_Secret,
    callbackURL: process.env.Callback_URL,
    passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) => {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    // return done(null, user);
    // let existingUser = await User.findOne({ googleId: profile.id });

        // if (existingUser) {
        //     return done(null, existingUser);
        // }

        // Create new user
        // let newUser =  User.create({
        //     googleId: profile.id,
        //     name: profile.displayName,
        //     email: profile.emails[0].value
        // });
        const newUser = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails && profile.emails[0] && profile.emails[0].value,
          photos: profile.photos
        };

        return done(null, newUser);
  }
));


passport.serializeUser(function(user, done) {
  console.log(user);
  done(null,  { id: user.id, name: user.name, email: user.email });
});

passport.deserializeUser(function(obj, done) {
  // User.findById(id, function (err, user) {
  //   done(err, user);
  // });
  done(null, obj);
});