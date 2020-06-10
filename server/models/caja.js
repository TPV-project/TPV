const mongoose = require('mongoose');
const { Schema } = mongoose;

const CajaSchema =  new Schema({
    cajaInicial : {type: Number, required: true},
    cajaFinal: {type: Number, required: false},
    sumaTarjeta: {type: Number, required: false},
    fecha: {type: Date, required: true},
});

module.exports = mongoose.model('Caja', CajaSchema);
