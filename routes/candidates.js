var express = require('express');
var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
var Election = mongoose.model('Election');
var router = express.Router();

var multer = require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');

  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname );
  }
});
var upload = multer({ storage : storage}).single('image');

router.post('/file',function(req, res)
{
  upload(req,res,function(err) {
        if(err) { console.log('Error al subir la imagen'); }
        else{  res.json(req.file);  console.log('Imagen subida...'); }
    });
});
router.get('/canditates', function (req, res)
{
  Candidate.find({status:true}).exec(function (err, candidate)
  {
    if(err){ res.send('Error');}
    else { res.json(candidate); }
  });
});
router.post('/candidate',function(req, res)
{
  var idElection = req.body.election;
    Election.findById(idElection).exec( function (err, election)
    {
      if(err)
      {
        console.log('Error al buscar la eleccion');
      }
      else
      {
        console.log(election)
          //info of candidate
          var e = {
            _id : new mongoose.Types.ObjectId,
            party: {} ,
            province:
            {
              canton:{},
              district: {}
            }
          };
          e.name = req.body.name;
          e.firstLastName = req.body.firstLastName;
          e.secondLastName = req.body.secondLastName;
          e.proposal = req.body.proposal;
          e.gender = req.body.gender;
          e.image = req.body.image;
          e.status = true;
          //province
          e.party._id = req.body.party._id;
          e.party.description = req.body.party.description;
          e.party.image = req.body.party.image;
          e.province.id = req.body.province.id;                                                                                                                                                                                                   5
          e.province.description = req.body.province.description;
          e.province.canton.id = req.body.canton.id;
          e.province.canton.description = req.body.canton.description;
          e.province.district.id = req.body.district.id;
          e.province.district.description = req.body.district.description;
          election.candidates.push(e);
        //save item
          election.save( function (err)
          {
            if(err) { return handleError(err);}
            res.json({status: 200,message: 'The register was saved successfully'});
          });
      }//end else
    });


});

router.put('/candidate-update/:idElection',function (req, res)
{
  var id = req.body._id;
  var update =
  {
    _id:req.body. _id,
    name : req.body.name,
    firstLastName : req.body.firstLastName,
    secondLastName : req.body.secondLastName,
    proposal : req.body.proposal,
    gender : req.body.gender,
    image: req.body.image,
    status: true,
    party: {
       _id : req.body.party._id,
       description: req.body.party.description,
       image: req.body.party.image
     },
    province:
    {
      id : req.body.province.id,
      description: req.body.province.description,
      canton: {
        id : req.body.province.canton.id,
        description : req.body.province.canton.description
      },
      district:{
        id : req.body.province.district.id,
        description : req.body.province.district.description
      }
    }
  };
  Election.findOneAndUpdate(
    {
       "_id": mongoose.Types.ObjectId(req.body.idElection),"candidates._id": mongoose.Types.ObjectId(req.body._id)
    },
    {
      "candidates.$" : update
    },function (err, election)
    {
      if(err)
      {
        res.send('Error');
      }
      console.log(election)
      res.json({status: 200,message: 'Was updated successfully'});
  });

});

router.put('/candidate-delete/:id', function (req, res)
{
  console.log(req.body)
  var id = req.body._id;
  if( id !='')
  {
      Election.findOneAndUpdate(
        {
          "_id": mongoose.Types.ObjectId(req.body.idElection),"candidates._id": mongoose.Types.ObjectId(req.body._id)
        },
        {
          "candidates.$.status": false
        },
        function (err, data)
        {
          if(err)
          {
            res.json({status: 400 ,message: 'Can not delete the register'});
          }
          res.json({status: 200, message: 'Was deleted successfully'});
        });
  }
});

module.exports = router;
