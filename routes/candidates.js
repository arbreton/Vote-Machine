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

router.post('/file',function(req, res)
{
  upload(req,res,function(err) {
        if(err) {

        }


    });
});


router.get('/canditates', function (req, res)
{
  Candidate.find({estatus:true}).exec(function (err, candidate)
  {
    if(err){ res.send('Error');}
    else { res.json(candidate); }
  });
});
router.post('/candidate',function(req, res)
{
  var  candidate = new Candidate();

    //info of candidate
    candidate.nombre = req.body.nombre;
    candidate.ap_paterno = req.body.ap_paterno;
    candidate.ap_materno = req.body.ap_materno;
    candidate.propuestas = req.body.propuesta;
    candidate.fecha_eleccion.codigo = req.body.fecha_eleccion.id;
    candidate.fecha_eleccion.fecha = req.body.fecha_eleccion.fecha;
    candidate.estatus = true;

    //province
    candidate.partido.codigo = req.body.partido.id;
    candidate.partido.descripcion = req.body.partido.descripcion;
    candidate.provincia.codigo = req.body.province.codigo;                                                                                                                                                                                                   5
    candidate.provincia.descripcion = req.body.province.descripcion;
    candidate.provincia.distrito.codigo = req.body.district.codigo;
    candidate.provincia.distrito.descripcion = req.body.district.descripcion;
    candidate.provincia.canton.codigo = req.body.province.canton.codigo;
    candidate.provincia.canton.descripcion = req.body.province.canton.descripcion;

    //save item
    candidate.save( function(err)
    {
      if(err) { return handleError(err);}
      else{ console.log('item saved...'); }
    });
});

router.put('/candidate/:id',function (req, res)
{
  var id = req.body._id;
  if(id !='')
  {
      var candidate = new Candidate({})
  }
});

module.exports = router;
