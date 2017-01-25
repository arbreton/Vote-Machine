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
      if(err){ console.log('Error al buscar la eleccion');}
      else
      {
        req.body.candidates.forEach( function(item, index)
        {
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
          e.name = item.name;
          e.firstLastName = item.firstLastName;
          e.secondLastName = item.secondLastName;
          e.proposal = item.proposal;
          e.gender = item.gender;
          e.image = item.image;
          e.status = true;
          //province
          e.party._id = item.party._id;
          e.party.description = item.party.description;
          e.party.image = item.party.image;
          e.province.id = item.province.id;                                                                                                                                                                                                   5
          e.province.description = item.province.description;
          e.province.canton.id = item.canton.id;
          e.province.canton.description = item.canton.description;
          e.province.district.id = item.district.id;
          e.province.district.description = item.district.description;
          election.candidates.push(e);
        });
        //save item
        election.save().then( function (can)
        {
          res.json({status: 200,message: 'The register was saved successfully'});
        }, function (err)
        {
          if(err) { return handleError(err);}
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
  var id = req.body._id;
  if( id !='')
  {
      var query = {
        _id: id
      };
      var update = {
        status: false
      };
      Election.findOneAndUpdate(query, update, function (err, data)
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
