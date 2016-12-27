var express = require('express');
var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
var Candidate = mongoose.model('Candidate');
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
    req.body.forEach( function(item, index)
    {
      var  candidate = new Candidate();
      //info of candidate
      candidate.name = item.name;
      candidate.first_last_name = item.first_last_name;
      candidate.second_last_name = item.second_last_name;
      candidate.proposal = item.proposal;
      candidate.gender = item.gender;
      candidate.initial_election.id = item.initial_election.id;
      candidate.initial_election.date = item.initial_election.date;
      candidate.final_election.id = item.final_election.id;
      candidate.final_election.date = item.final_election.date;
      candidate.image = item.image;
      candidate.status = true;
      //province
      candidate.match._id = item.match._id;
      candidate.match.description = item.match.description;
      candidate.match.image = item.match.image;
      candidate.province.id = item.province.id;                                                                                                                                                                                                   5
      candidate.province.description = item.province.description;
      candidate.province.canton.id = item.canton.id;
      candidate.province.canton.description = item.canton.description;
      candidate.province.district.id = item.district.id;
      candidate.province.district.description = item.district.description;

      //save item
      candidate.save().then( function (can)
      {
        res.json({status: 200,message: 'The register was saved successfully'});
      }, function (err)
      {
        if(err) { return handleError(err);}
      });
    });
});

router.put('/candidate-update/:id',function (req, res)
{
  var id = req.body._id;
  console.log(req.body);
  if(id !='')
  {
    var query = { _id: id};
    var update =
    {
      name : req.body.name,
      first_last_name : req.body.first_last_name,
      second_last_name : req.body.second_last_name,
      proposal : req.body.proposal,
      gender : req.body.gender,
      election_date : {id: req.body.election_date.id, date: req.body.election_date.date },
      image: req.body.image,
      match: { _id : req.body.match._id, description: req.body.match.description },
      province: { id : req.body.province.id, description: req.body.province.description,
        canton: { id : req.body.province.canton.id, description : req.body.province.canton.description },
        district:{ id : req.body.district.id, description : req.body.province.canton.description } }
    };
    Candidate.findOneAndUpdate(query, update, function (err, data)
    {
      if(err){console.log('Error in update');}
      res.json({status: 200,message: 'Was updated successfully'});
    });
  }
});

router.put('/candidate-delete/:id', function (req, res)
{
  var id = req.body._id;
  if( id !='')
  {
      var query = { _id: id};
      var update = {status: false};
      Candidate.findOneAndUpdate(query, update, function (err, data)
      {
        if(err){ res.json({status: 400 ,message: 'Can not delete the register'});}
        res.json({status: 200, message: 'Was deleted successfully'});
      });
  }
});

module.exports = router;
