// Codigo del servidor
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000) //toma el puerto dado por el servicio en la nube o en local el 3000

// Middlewares (se ejecutan antes de las rutas)
app.use(morgan('dev')); //el modulo morgan permite ver en consola las peticiones al servidor
app.use(express.json()); //el modulo json verifica y permite enviar y recibir datos en formato json

// Routes
app.use('/home' ,require('./routes/routes'));
app.use('/api/products' ,require('./routes/products.routes'));
app.use('/api/tickets' ,require('./routes/tickets.routes'));
app.use('/api/caja' ,require('./routes/caja.routes'));
app.use('/api/usuario' ,require('./routes/usuario.routes'));
app.use('/api/rol' ,require('./routes/rol.routes'));

// Static files
app.use(express.static(path.join(path.dirname(__dirname), 'client/public'))); //lugar donde se encuentra index.html (base de todo)

// Starting server (inicio del servidor)

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
