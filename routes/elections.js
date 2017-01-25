var express = require('express');
var mongoose = require('mongoose');
var app = express.Router();
var Election = mongoose.model('Election');

app.route('/election')
  .get( function (req, res)
  {
    /*Election.aggregate(    {
            $unwind:
                "$candidates"
        },
        {
            $match:
                { "candidates.status": true }
        }, function (err,data)
        {
          if(err) {res.send(err);}
          console.log(data);
        })*/
    Election.find({"candidates.$.status": true}).exec(function (err, data)
    {
      if(err)
      {
          res.send(err);
      }
      else
      {
        res.json(data);
        console.log(data)
      }
    });
  })
  .post( function (req, res){
    var election = new Election();
    election._id = new mongoose.Types.ObjectId;
    election.initialElection = req.body.initialElection;
    election.finalElection = req.body.finalElection;
    election.electionDay = new Date(req.body.electionDay);
    election.save( function(err)
    {
      if(err){ res.json({status:500, message: 'Error saved the register'});}
      else{ res.json({status: 200, message:'The was saved succesfully'});}
    });
  });
  ;

module.exports = app;
