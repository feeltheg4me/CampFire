const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Model/user');

passport.use(new GoogleStrategy({
  clientID: '558251141016-b8dcipf7emq545qdn42ghbr1skaqd0jg.apps.googleusercontent.com',
  clientSecret: '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', 
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      return done(null, user);
    }

    user = new User({
      username: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id
    });

    await user.save();
    done(null, user);
  } catch (err) {
    done(err, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
