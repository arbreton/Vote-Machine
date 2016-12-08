var express = import('express');
var mongoose = import('mongoose');
var Province = mongoose.model('Province');
var app = express();

app.get('/provinces', function (req, res)
{
  Province.find({}).exec(function (err, province)
  {
    res.json(province);
  });
});
