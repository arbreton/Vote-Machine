var mongoose = require('mongoose'); //importar mongoose
var Schema = mongoose.Schema; //referenciar la propiedad shcema

var candidateSchema = new Schema({ //Propiedades de mi schema
    name : String,
    first_last_name: String,
    second_last_name: String,
    proposal: String,
    status: Boolean,
    gender: String,
    image: String,
    initial_election: {id: String,  date: String},
    final_election: {id: String,  date: String},
    match: { _id: String, description: String, image: String },
    province: { id: String, description: String, district:{ id: String, description: String}, canton: {id: String, description: String} }
});

//exportar el modelo
module.exports = mongoose.model('Candidate', candidateSchema);
