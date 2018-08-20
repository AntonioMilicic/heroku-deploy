const express = require('express');
const router = express.Router();
const passport = require('passport');

const authUser = (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};
router.get('/logout', authUser, (req, res) => {
  req.logout();
  res.redirect('/'); // where to redirect after login out?
});
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/'); // try to redirect from where user logged in
});
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/'); // try to redirect from where user logged in
});

module.exports = router;
