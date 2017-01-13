var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var electionSchema = new Schema({
 initialElection: Date,
 finalElection: Date,
 electionDay: Date,
 votes: [
   {
     name:String,
     gender:String,
     provinceCode:String,
     age: Number,
     hour:String,
     ethnicGroup:String}],
 candidates: [{
   name : String,
   firstLastName: String,
   secondLastName: String,
   proposal: String,
   gender: String,
   image: String,
   party: {
     _id: String,
     description: String,
     image: String
   },
   province: {
     id: String,
     description: String,
     district:{
       id: String,
       description: String
     },
     canton: {
       id: String,
       description: String
     }
   }

 }]

});


module.exports = mongoose.model('Election', electionSchema);
