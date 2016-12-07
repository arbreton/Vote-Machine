var mongoose = require('mongoose');

var CiudadanosSchema = new mongoose.Schema({
  clave_electoral: String,
  provincia: { type: mongoose.Schema.Types.ObjectId, ref: 'Provincia' }
  genero: String,
  fecha_caducidad: String,
  estatus: String,
  nombre: String,
  ap_paterno: String,
  ap_materno: String,
  edad: String,
  pass: String,
  //upvotes: {type: Number, default: 0},
  rol: { type: mongoose.Schema.Types.ObjectId, ref: 'Rol' }
});

/*CiudadanosSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

CiudadanosSchema.methods.downvote = function (cb) {
  this.upvotes -= 1;
  this.save(cb);
};*/

mongoose.model('Ciudadanos', CiudadanosSchema);