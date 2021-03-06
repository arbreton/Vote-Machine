var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('Citizen');
var app = express();
passport.use(new LocalStrategy(
  function(electoralCode, password, done) {
    User.findOne({ electoralCode: electoralCode }, function (err, user) {
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

