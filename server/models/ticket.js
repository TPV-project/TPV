const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketSchema =  new Schema({
    ticketProductos : {type: Array, required: true},//Cambiar a vector de [producto,cantidad]
    total: {type: Number, required: true},
    fecha: {type: Date, required: true},
    efectivo: {type: Boolean, required: true},
    cantidad: {type: Number, required: false},
    cambio: {type: Number, required: true},
    barra: {type: Boolean, required: true}
});

module.exports = mongoose.model('Ticket', TicketSchema);
