const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/User.js");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "949540576509-sovcpo2b45u8fl3fqt2e8ijhkjcse7lv.apps.googleusercontent.com",
      clientSecret: "sEb3NKvZp8U5XUccbbR5W7sB",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        { googleId: profile.id, displayName: profile.displayName },
        function(err, user) {
          return done(err, user);
        }
      );
    }
  )
);