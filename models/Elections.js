var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var electionSchema = new Schema({

 initial_election: Date,

 final_election: Date,

 election_day: Date,

 votes: [{name:String,gender:String,province_code:String,age: Number,hour:String,ethnic_group:String}],

 candidates: [{

   name : String,

   first_last_name: String,

   second_last_name: String,

   proposal: String,

   gender: String,

   image: String,

   party: { _id: String, description: String, image: String },

   province: { id: String, description: String, district:{ id: String, description: String}, canton: {id: String, description: String} }

 }]

});


module.exports = mongoose.model('Election', electionSchema);
