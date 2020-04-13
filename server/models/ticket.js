const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketSchema =  new Schema({
    listaProductos : {type: String, required: true},//Cambiar a vector de [producto,cantidad]
    total: {type: Number, required: true},
    fecha: {type: Date, required: true, default: Date.now()},
    efectivo: {type: Boolean, required: true},
    cambio: {type: Number, required: true},
    barra: {type: Boolean, required: true}
});

module.exports = mongoose.model('Ticket', TicketSchema);
