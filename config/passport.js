var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('Citizen');

/*
 passport.use('login', new LocalStrategy({
          passReqToCallback : true
      },
      function(req, electoral_code, password, done) { 
        // check if user with username exists or not
        User.findOne({ 
          where: {
            electoral_code:  electoral_code 
          }
        }).then(function(electoral_code) {
            if (!electoral_code){
              console.log('User Not Found with username '+electoral_code);
              return done(null, false, { message: 'Incorrect username.' });       
            }
            if (!isValidPassword(electoral_code, password)){
              console.log('Invalid Password');
              return done(null, false, { message: 'Incorrect password.' });
            }
            console.log('username and password matched');
            return done(null, electoral_code);
          }
        );

      })
  );*/


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

