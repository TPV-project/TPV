const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema =  new Schema({
    nombre : {type: String, required: true},
    apellidos: {type: String, required: true},
    password: {type: String, required: true},
    activo: {type: Boolean, required: true},
    rol: {type: String, required: true}//Foreign key a la tabla roles
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
