var express = require('express');
var mongoose = require('mongoose');
var Candidate = mongoose.model('Candidate');
var router = express.Router();

router.post('/canditates', function (req, res)
{
  Candidate.findOne({}).exec(function (err, candidate)
  {
    if(err){ res.send('Error');}
    else { res.json(candidate); }
  });
});

router.post('/candidate', function(req, res)
{
  console.log(req.body);
});

module.exports = router;
