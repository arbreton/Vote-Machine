var mongoose = require('mongoose');

var DistritosSchema = new mongoose.Schema({
  descripcion: String,
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

mongoose.model('Distritos', DistritosSchema);