var mongoose = require('mongoose');

var CitizensSchema = new mongoose.Schema({
  clave_electoral: String,
  provincia: { codigo: String, descripcion: String, canton: String, distrito: String }
  genero: String,
  fecha_caducidad: String,
  estatus: String,
  nombre: String,
  ap_paterno: String,
  ap_materno: String,
  edad: String,
  pass: String,
  rol: { id: String, descripcion: String }
});


mongoose.model('Citizens', CitizensSchema);