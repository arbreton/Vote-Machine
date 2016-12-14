var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

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
  candidatos: {presidenciales:[{nombre:String, ap_paterno:String, ap_materno:String,propuestas:String, partido: {codigo:String,descripcion:String},fecha_eleccion:String, estatus_votacion:{fecha_votacion:String,voto:Boolean},otros:String}]},
  //hash: String,
  //salt: String
});


CitizensSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.clave_electoral,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

CitizensSchema.methods.setPassword = function(pass){
  //this.salt = crypto.randomBytes(16).toString('hex');

  //this.hash = crypto.pbkdf2Sync(pass, this.salt, 1000, 64).toString('hex');
};

CitizensSchema.methods.validPassword = function(pass) {
  //var hash = crypto.pbkdf2Sync(pass, this.salt, 1000, 64).toString('hex');

  //return this.hash === hash;
  return pass;
};

mongoose.model('Citizen', CitizensSchema);