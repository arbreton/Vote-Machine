var mongoose = require('mongoose'); //importar mongoose
var Schema = mongoose.Schema; //referenciar la propiedad shcema

var candidateSchema = new Schema({ //Propiedades de mi schema
    nombre : String,
    ap_paterno: String,
    ap_materno: String,
    propuesta: String,
    estatus: Boolean,
    genero: String,
    foto: String,
    fecha_eleccion: {codigo: String,  fecha: String},
    partido: { codigo: String, descripcion: String, foto: String },
    provincia: { codigo: String, descripcion: String, distrito:{ codigo: String, descripcion: String}, canton: {codigo: String, descripcion: String} }
});

//exportar el modelo
module.exports = mongoose.model('Candidate', candidateSchema);
