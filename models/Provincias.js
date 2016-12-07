var mongoose = require('mongoose');

var ProvinciasSchema = new mongoose.Schema({
  codigo: String,
  descripcion: String,
  cantones: { descripcion: String, distritos: { descripcion: String, } }
 
});

mongoose.model('Provincias', ProvinciasSchema);