const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema =  new Schema({
    nombre : {type: String, required: true},
    precio: {type: Number, required: true},
    cocina: {type: Boolean, required: true}
});

module.exports = mongoose.model('Producto', ProductoSchema);
