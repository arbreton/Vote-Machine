var mongoose = require('mongoose');

var ProvinciasSchema = new mongoose.Schema({
  codigo: String,
  descripcion: String,
  cantones: { type: mongoose.Schema.Types.ObjectId, ref: 'Cantones' }
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

mongoose.model('Provincias', ProvinciasSchema);