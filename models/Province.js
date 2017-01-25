var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var provinceSchema = new Schema({
  id: String,
  description: String,
  cantones: [
    {  id: String, description: String,
       districts: [{ id: String, description: String } ]
    }
   ]
});
mongoose.model('Province', provinceSchema);