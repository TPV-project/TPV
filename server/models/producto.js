const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema =  new Schema({
    nombre : {type: String, required: true},
    precio_llevar: {type: Number, required: true},
    precio_barra: {type: Number, required: true},
    cocina: {type: Boolean, required: true},
    categoria: {type: String, required: true}
});

module.exports = mongoose.model('Producto', ProductoSchema);
