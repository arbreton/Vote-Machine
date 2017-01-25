var express = require('express');
var mongoose = require('mongoose');
var app = express.Router();
var Election = mongoose.model('Election');

app.route('/election')
  .get( function (req, res)
  {
    Election.find().exec(function (err, candidate)
    {
      if(err){ res.send('Error');}
      else { res.json(candidate); }
    });
  })
  .post( function (req, res){
    var election = new Election();
    election._id = new mongoose.Types.ObjectId;
    election.initialElection = req.body.initialElection;
    election.finalElection = req.body.finalElection;
    election.electionDay = new Date(req.body.electionDay);
    election.electionDay.setHours(-8,0,0,0);
    election.save( function(err)
    {
      if(err){ res.json({status:500, message: 'Error saved the register'});}
      else{ res.json({status: 200, message:'The was saved succesfully'});}
    });
  });
  ;

module.exports = app;
