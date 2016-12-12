var express = require('express');
var mongoose = require('mongoose');
var Province = mongoose.model('Province');
var multer = require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('file');

var app = express();

app.get('/provinces', function (req, res)
{
  Province.find({}).sort({descripcion: 1}).exec(function (err, province)
  {
    res.json(province);
  });
});

app.post('/file',function(req, res)
{
  upload(req,res,function(err) {
        if(err) {
       console.log("Error uploading file.");
        }
        console.log("File is uploaded");
        console.log(req);

    });
});

app.get('/test', function (req ,res)
{
  console.log("test")
});
module.exports = app;
