const mongoose = require('mongoose');
const { Schema } = mongoose;

const CajaSchema =  new Schema({
    cajaInicial : {type: Number, required: true},
    cajaFinal: {type: Number, required: true},
    sumaTarjeta: {type: Number, required: true}
});

module.exports = mongoose.model('Caja', CajaSchema);
