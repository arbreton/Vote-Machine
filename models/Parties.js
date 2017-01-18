var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var partySchema = new Schema({
  description: String,
  status: Boolean,
  image: String
});
module.exports = mongoose.model('Party', partySchema);
