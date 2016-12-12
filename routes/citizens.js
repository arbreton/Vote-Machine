var express = require('express');
var mongoose = require('mongoose');
var Citizen = mongoose.model('Citizen');
var router = express.Router();





router.post('/citizens', function (req, res)
{

  Citizen.find({ 'clave_electoral': req.body.username }, function (err, citizen) {
  if (err) return handleError(err);
  res.json(citizen);
  //console.log('%s %s %s.', citizen.nombre, citizen.ap_paterno, citizen.ap_materno) // Space Ghost is a talk show host.
});
});

module.exports = router;