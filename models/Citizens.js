var mongoose = require('mongoose');
var crypto = require('crypto');
var algorithm = 'aes-256-ctc';
var key = 'Where the lake ends';
var jwt = require('jsonwebtoken');
var CitizensSchema = new mongoose.Schema({
  province: { code: String, description: String, canton: String, district: String },
  electoralCode: String,
  gender: String,
  image:String,
  expirationDate: String,
  status: String,
  name: String,
  firstLastName: String,
  secondLastName: String,
  birthDate: String,
  password: String,
  ethnicGroup:String,
  role: { id: String, description: String },
  votes:[{electionID:String}]
});
CitizensSchema.methods.generateJWT = function() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    _id: this._id,
    electoralCode: this.electoralCode,
    role: this.role.id,
    birthDate: this.birthDate,
    name: this.name,
    firstLastName: this.firstLastName,
    secondLastName: this.secondLastName,
    gender:this.gender,
    province: this.province.description,
    provinceCode:this.province.code,
    ethnicGroup:this.ethnicGroup,
    canton: this.province.canton,
    district: this.province.district,
    image: this.image,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRETZ');
};
CitizensSchema.methods.setPassword = function(password){
};
CitizensSchema.methods.validPassword = function(password) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  console.log(password);
  var dec = cipher.update(password,'utf8','base64');
  dec += cipher.final('base64');
  console.log(dec);
  console.log(this.password);
  return this.password === dec;
};
mongoose.model('Citizen', CitizensSchema);