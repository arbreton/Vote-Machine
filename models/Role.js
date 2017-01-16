var mongoose = require('mongoose');
var RoleSchema = new mongoose.Schema({
  descripcion: String 
});
mongoose.model('Role', RoleSchema);