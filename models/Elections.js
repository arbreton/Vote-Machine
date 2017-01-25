var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var electionSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
   _id:Schema.Types.ObjectId,
   name : String,
   firstLastName: String,
   secondLastName: String,
   proposal: String,
   gender: String,
   status: Boolean,
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
