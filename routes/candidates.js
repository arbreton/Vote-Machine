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
    callback(null,  file.originalname );
  }
});

var upload = multer({ storage : storage}).single('foto');

router.post('/file',function(req, res)
{
  upload(req,res,function(err) {
        if(err) { console.log('Error al subir la imagen'); }
        else{console.log('imagen salvada..');}
        console.log(req);
        console.log(req.body);
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
      candidate.election_date.id = item.election_date.id;
      candidate.election_date.date = item.election_date.date;
      candidate.status = true;

      //province
      candidate.match.id = item.match.id;
      candidate.match.description = item.match.description;
      candidate.province.id = item.province.id;                                                                                                                                                                                                   5
      candidate.province.description = item.province.description;
      candidate.province.district.id = item.district.id;
      candidate.province.district.description = item.district.description;
      candidate.province.canton.id = item.province.canton.id;
      candidate.province.canton.description = item.province.canton.description;

      //save item
      candidate.save( function(err)
      {
        if(err) { return handleError(err);}
        else{res.json({status: 200,message: 'The register was saved successfully'}); }
      });

    });
});

router.put('/candidate-update/:id',function (req, res)
{
  var id = req.body._id;
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
      match: { id : req.body.match.id, description: req.body.match.description },
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
