var mongoose = require('mongoose');

var RolSchema = new mongoose.Schema({
  id: String,
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

mongoose.model('Rol', RolSchema);