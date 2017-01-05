var express = require('express');
var mongoose = require('mongoose');
var app = express.Router();
var Election = mongoose.model('Election');

app.route('/election')
  .get( function (req, res){
    Election.find({}).exec(function (err, data){
      if(err){}
      else{ res.json(data); }
    });
  })
  .post( function (req, res){
    var election = new Election();
    election.initial_election = req.body.initial_election;
    election.final_election = req.body.final_election;
    election.election_day = req.body.election_day;
    election.save( function(err)
    {
      if(err){ res.json({status:500, message: 'Error saved the register'});}
      else{ res.json({status: 200, message:'The was saved succesfully'});}
    });
  });
  ;

module.exports = app;
