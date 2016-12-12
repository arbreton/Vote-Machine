var mongoose = require('mongoose');

var ProvinceSchema = new mongoose.Schema({
  codigo: String,
  descripcion: String,
  cantones: [
    {  codigo: String, descripcion: String,
       distritos: [{ codigo: String, descripcion: String } ]  
    }
   ]

});

mongoose.model('Province', ProvinceSchema);
