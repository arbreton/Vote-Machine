var express = require('express');
var mongoose = require('mongoose');
var Match = mongoose.model('Match');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback){
    callback(null, './uploads');
  },
  filename: function (req, file, callback){
    callback(null, file.originalname);
  }
});

var upload = multer({storage: storage}).single('match');
var router = express.Router();

router.route('/match')
.get( function (req, res)
{
  Match.find({status:true}).exec(function (err, match)
  {
    if(err){ res.json({status: 500, message: "Error" }); }
    else{ res.json(match); }
  });
})
.post(function (req, res)
{
  upload(req, res, function (err){
    if(err){ res.json({status: 400, message: 'Error uploading file'}); }
    else
    {
      var match = new Match();
      match.description = req.body.description;
      match.save(function (err)
      {
          res.json({status: 200, message:'The register was saved succesfullys'});
      });

     }
  })
})

.put(function (req, res)
{
  var id = req.body._id;
  var query = { _id : id};
  var update =
  {
     description: req.body.description,
  };
  Match.findOneAndUpdate(query, update, function (err, data)
  {
    if(err){ res.json({status: 500 ,message:'Error in updated of the register' }); }
    else { res.json({status: 200, message: 'The register was updated successfully'});  console.log(req.body)}
  })

});


module.exports = router;
