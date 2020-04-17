const mongoose = require('mongoose');
const { Schema } = mongoose;

const RolSchema =  new Schema({
    tipo : {type: String, required: true}
});

module.exports = mongoose.model('Rol', RolSchema);
