var express = require('express');
var mongoose = require('mongoose');
var Candidate = mongoose.model('Candidate');
var app = express();

app.get('/canditates', function (req, res)
{
  Candidate.findOne({}).exec(function (err, candidate)
  {
    if(err){ res.send('Error');}
    else { res.json(candidate); }
  });
});

module.exports = app;
