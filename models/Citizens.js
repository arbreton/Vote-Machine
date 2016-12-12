var mongoose = require('mongoose');

var CitizensSchema = new mongoose.Schema({
  clave_electoral: String,
  provincia: { codigo: String, descripcion: String, canton: String, distrito: String },
  genero: String,
  fecha_caducidad: String,
  estatus: String,
  nombre: String,
  ap_paterno: String,
  ap_materno: String,
  edad: String,
  pass: String,
  rol: { id: String, descripcion: String },
  candidatos: {presidenciales:[{nombre:String, ap_paterno:String, ap_materno:String,propuestas:String, partido: {codigo:String,descripcion:String},fecha_eleccion:String, estatus_votacion:{fecha_votacion:String,voto:Boolean},otros:String}]}
});


mongoose.model('Citizen', CitizensSchema);