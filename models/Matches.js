var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
  description: String,
  status: Boolean,
  image: String
});

module.exports = mongoose.model('Match', matchSchema);
