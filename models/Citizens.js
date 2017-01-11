var mongoose = require('mongoose');
var crypto = require('crypto');
var algorithm = 'aes-256-ctc';
var key = 'Where the lake ends';
var jwt = require('jsonwebtoken');
//var passkey= "";



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
  ethnic_group:String,
  role: { id: String, description: String },
  votes:[{electionID:String}],
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
    gender:this.gender,
    province: this.province.description,
    province_code:this.province.code,
    ethnic_group:this.ethnic_group,
    canton: this.province.canton,
    district: this.province.district,
    image: this.image,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRETZ');
};

CitizensSchema.methods.setPassword = function(password){
  //this.salt = crypto.randomBytes(16).toString('hex');

  //this.hash = crypto.pbkdf2Sync(pass, this.salt, 1000, 64).toString('hex');
};

CitizensSchema.methods.validPassword = function(password) {

  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var dec = decipher.update(this.password,'base64','utf8');
  dec += decipher.final('utf8');
  return dec;

};

 

mongoose.model('Citizen', CitizensSchema);