var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/goals',
    failureRedirect: '/goals'
  }
));

router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if(err) console.log(err)
    res.redirect('/goals')
  })
})

module.exports = router;

