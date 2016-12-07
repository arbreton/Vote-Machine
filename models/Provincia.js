var mongoose = require('mongoose');

var ProvinciaSchema = new mongoose.Schema({
  codigo: String,
  descripcion: String,
  canton: String,
  distrito: String,
  //upvotes: {type: Number, default: 0},
  //provincia: { type: mongoose.Schema.Types.ObjectId, ref: 'Provincia' }
});

/*CiudadanosSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

CiudadanosSchema.methods.downvote = function (cb) {
  this.upvotes -= 1;
  this.save(cb);
};*/

mongoose.model('Provincia', ProvinciaSchema);