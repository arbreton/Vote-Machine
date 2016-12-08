var mongoose = require('mongoose');

var ProvinceSchema = new mongoose.Schema({
  codigo: String,
  descripcion: String,
  cantones: { descripcion: String, distritos: { descripcion: String } }

});

mongoose.model('Province', ProvinceSchema);
