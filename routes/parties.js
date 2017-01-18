var express = require('express');
var mongoose = require('mongoose');
var Party = mongoose.model('Party');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback){
    callback(null, './public/uploads/parties');
  },
  filename: function (req, file, callback){
    callback(null, file.originalname);
  }
});

var upload = multer({storage: storage}).single('image');
var router = express.Router();

router.route('/parties')
.get( function (req, res)
{
  Party.find({status:true}).exec(function (err, party)
  {
    if(err){ res.json({status: 500, message: "Error" }); }
    else{ res.json(party); }
  });
})
.post(function (req, res)
{
    var party = new Party();
    party.description = req.body.name;
    party.image = req.body.path;
    party.status = true;
    party.save(function (err)
    {
      if(err)
      {
        res.json({status: 400, message: 'Error uploading file'});
      }
      else
      {
          res.json({status: 200, message:'The register was saved succesfullys'});
      }
    });
})

.put(function (req, res)
{
  console.log(req.body);
  console.log("test");
  var id = req.body._id;
  var query = { _id : id};
  var update =
  {
     description: req.body.description,
     image: req.body.image
  };
  Party.findOneAndUpdate(query, update, function (err, data)
  {
    if(err)
    {
      res.json({status: 500 ,message:'Error in updated of the register' });
     }
    else
    {
      res.json({status: 200, message: 'The register was updated successfully'});
    }
  });

});

router.put('/party-delete',function (req, res)
{
  var id = req.body._id;
  var query = { _id : id};
  var update =
  {
     status: false,
  };
  Party.findOneAndUpdate(query, update, function (err, data)
  {
    if(err)
    {
      res.json({status: 500 ,message:'Error in updated of the register' });
     }
    else
    {
      res.json({status: 200, message: 'The register was updated successfully'});
    }
  });

});
router.post('/upload-file-party', function(req, res)
{
  upload(req, res, function (err){
    if(err)
    {
      res.json({status: 400, message: 'Error uploading file'});
    }
    else
    {
      res.json(req.file);
    }
  });

});

module.exports = router;
