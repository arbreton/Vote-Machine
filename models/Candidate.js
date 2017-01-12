var mongoose = require('mongoose'); //importar mongoose
var Schema = mongoose.Schema; //referenciar la propiedad shcema

var candidateSchema = new Schema({ //Propiedades de mi schema
    name : String,
    firstLastName: String,
    secondLastName: String,
    proposal: String,
    status: Boolean,
    gender: String,
    electionDay: Date,
    image: String,
    initialElection: {id: String,  date: String},
    finalElection: {id: String,  date: String},
    party: { _id: String, description: String, image: String },
    province: { id: String, description: String, district:{ id: String, description: String}, canton: {id: String, description: String} }
});

//exportar el modelo
module.exports = mongoose.model('Candidate', candidateSchema);
