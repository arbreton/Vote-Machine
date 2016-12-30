var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var CitizensSchema = new mongoose.Schema({
  province: { code: String, description: String, canton: String, district: String },
  electoral_code: String,
  gender: String,
  image:String,
  expiration_date: String,
  status: String,
  name: String,
  first_lastname: String,
  second_lastname: String,
  birth_date: String,
  password: String,
  role: { id: String, description: String },
  candidates: {presidential:[{name:String, first_lastname:String, second_lastname:String,proposals:String, party: {code:String,description:String},election_date:String, vote_status:{vote_date:String,vote_hour:String,voted:Boolean},others:String}]},
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
    electoral_code: this.electoral_code,
    role: this.role.id,
    birth_date: this.birth_date,
    name: this.name,
    first_lastname: this.first_lastname,
    second_lastname: this.second_lastname,
    province: this.province.description,
    canton: this.province.canton,
    district: this.province.district,
    image: this.image,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

CitizensSchema.methods.setPassword = function(password){
  //this.salt = crypto.randomBytes(16).toString('hex');

  //this.hash = crypto.pbkdf2Sync(pass, this.salt, 1000, 64).toString('hex');
};

CitizensSchema.methods.validPassword = function(password) {
  //var hash = crypto.pbkdf2Sync(pass, this.salt, 1000, 64).toString('hex');

  //return this.hash === hash;
  return password;
};

mongoose.model('Citizen', CitizensSchema);