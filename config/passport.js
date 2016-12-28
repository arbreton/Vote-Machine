var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('Citizen');
var localsignin = require('passport-local').Strategy;





passport.authenticate('localsignin', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true })



passport.use(new LocalStrategy(
  function(electoral_code, password, done) {
    User.findOne({ electoral_code: electoral_code }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }).maxTime(20000);
  }
));
/*
passport.serializeUser(function(user, done) {
    done(null, user.id);
});*/