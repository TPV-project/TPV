const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsusariSchema = new Schema({
    nom: { type: String, required: true },
    contrasenya: { type: String, required: true },
    rols: { type: Boolean, required: true }, //poner un array de permisos
});

module.exports = mongoose.model('Usuari', UsusariSchema);