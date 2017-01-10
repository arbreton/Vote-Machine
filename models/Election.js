var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var electionSchama = new Schema({
  initial_election: Date,
  final_election: Date,
  election_day: Date,
  votes: [{name:String,gender:String,provinceCode:String,age: Number,hour:String,ethnicity:String}],
  candidates: [{
    name : String,
    first_last_name: String,
    second_last_name: String,
    proposal: String,
    status: Boolean,
    gender: String,
    image: String,
    party: { _id: String, description: String, image: String },
    province: { id: String, description: String, district:{ id: String, description: String}, canton: {id: String, description: String} }
  }]
});

module.exports = mongoose.model('Election', electionSchama);
