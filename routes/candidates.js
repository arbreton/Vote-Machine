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
  Candidate.find({estatus:true}).exec(function (err, candidate)
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
      candidate.nombre = item.nombre;
      candidate.ap_paterno = item.ap_paterno;
      candidate.ap_materno = item.ap_materno;
      candidate.propuesta = item.propuesta;
      candidate.genero = item.gender;
      candidate.fecha_eleccion.codigo = item.fecha_election.codigso;
      candidate.fecha_eleccion.fecha = item.fecha_election.fecha;
      candidate.estatus = true;

      //province
      candidate.partido.codigo = item.partido.id;
      candidate.partido.descripcion = item.partido.descripcion;
      candidate.provincia.codigo = item.province.codigo;                                                                                                                                                                                                   5
      candidate.provincia.descripcion = item.province.descripcion;
      candidate.provincia.distrito.codigo = item.district.codigo;
      candidate.provincia.distrito.descripcion = item.district.descripcion;
      candidate.provincia.canton.codigo = item.province.canton.codigo;
      candidate.provincia.canton.descripcion = item.province.canton.descripcion;

      //save item
      candidate.save( function(err)
      {
        if(err) { return handleError(err);}
        else{ console.log('item saved...'); }
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
      nombre : req.body.nombre,
      ap_paterno : req.body.ap_paterno,
      ap_materno : req.body.ap_materno,
      propuesta : req.body.propuesta,
      genero : req.body.gender,
      fecha_eleccion : {codigo: req.body.fecha_eleccion.codigo, fecha: req.body.fecha_eleccion.fecha },
      partido: { codigo : req.body.partido.id, descripcion: req.body.partido.descripcion },
      provincia: { codigo : req.body.province.codigo, descripcion: req.body.province.descripcion,
        canton: { codigo : req.body.province.canton.codigo, descripcion : req.body.province.canton.descripcion },
        distrito:{ codigo : req.body.district.codigo, descripcion : req.body.province.canton.descripcion } }
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
      var update = {estatus: false};
      Candidate.findOneAndUpdate(query, update, function (err, data)
      {
        if(err){ res.json({status: 400 ,message: 'Can not delete the register'});}
        res.json({status: 200, message: 'Was deleted successfully'});
      });
  }
});

module.exports = router;
