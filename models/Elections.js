var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var electionSchama = new Schema({
  initial_election: {},
  final_election: {},
  election_day: Date,
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate'}]
});

module.exports = mongoose.model('Election', electionSchama);
