const express = require('express');
const { verifySignUp } = require('../Mid');
const controller = require('../Controller/auth.controller');
const passport = require('passport');

const router = express.Router();

// Set headers for CORS
router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

// Signup route
router.post(
  '/signup',
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);

// Signin route
router.post('/signin', controller.signin);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
}), controller.googleAuthCallback);

router.get('/logout', controller.logout);

module.exports = router;
