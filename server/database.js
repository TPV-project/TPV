//Codigo de la base de datos
const mongoose = require('mongoose');
const uri = "mongodb+srv://dev:dev@tpv-u1eo4.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 5000})
    .then(db => console.log('DB connected'))
    .catch(err => console.error(err));

module.exports = mongoose;