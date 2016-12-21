var express = require('express');
var mongoose = require('mongoose');
var Province = mongoose.model('Province');

var app = express();

app.get('/provinces', function (req, res)
{
  Province.find({}).sort({description: 1}).exec(function (err, province)
  {
    res.json(province);
  });
});

module.exports = app;
