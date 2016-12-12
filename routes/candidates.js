var express = require('express');
var mongoose = require('mongoose');
var Candidate = mongoose.model('Candidate');
var router = express.Router();

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

router.post('/canditates', function (req, res)
{
  Candidate.findOne({}).exec(function (err, candidate)
  {
    if(err){ res.send('Error');}
    else { res.json(candidate); }
  });
});

router.post('/candidate', function (req, res)
{
  console.log(res)
});

route.post('/file',function(req, res)
{
  upload(req,res,function(err) {
        if(err) {
       console.log("Error uploading file.");
        }
        console.log("File is uploaded");
        console.log(req);

    });
});


router.post('/candidate', function(req, res)
{
  console.log(req.body);
});

module.exports = router;
