var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');

//var Post = mongoose.model('Post');
//var Comment = mongoose.model('Comment');
var User = mongoose.model('Citizen');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.clave_electoral = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

console.log('(calling passport)');
  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;