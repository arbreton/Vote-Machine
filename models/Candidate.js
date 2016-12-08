var mongoose = require('mongoose'); //importar mongoose
var Schema = mongoose.Schema; //referenciar la propiedad shcema

var candidateSchema = new Schema({ //Propiedades de mi schema
  presidenciales: [{
    nombre : String,
    ap_paterno: String,
    ap_materno: String,
    propuesta: String,
    partido: { codigo: String, descripcion: String, img: String },
    provincia: { codigo: String, descripcion: String, distritos:{ codigo: String, descripcion: String, canton: String } }
  }]
});

//exportar el modelo
module.exports = mongoose.model('Candidate', candidateSchema);
