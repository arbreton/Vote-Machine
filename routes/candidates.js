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

var upload = multer({ storage : storage}).single('foto');

router.post('/file',function(req, res)
{
  upload(req,res,function(err) {
        if(err) { console.log('error image'); }
        req.body.file.forEach( function (item, index)
        {
            console.log(item)
        });
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
      candidate.propuestas = item.propuesta;
      candidate.genero = item.gender;
      candidate.fecha_eleccion.codigo = item.fecha_election.codigo;
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

router.put('/candidate/:id',function (req, res)
{
  var id = req.body._id;
  if(id !='')
  {
      var candidate = new Candidate({})
  }
});

module.exports = router;
