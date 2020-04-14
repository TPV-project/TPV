const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsusarioSchema = new Schema({
    nombre: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: Boolean, required: true }, //poner un array de permisos
});

module.exports = mongoose.model('Usuario', UsusarioSchema);