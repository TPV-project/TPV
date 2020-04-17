//Configuracion de rutas
const express = require('express');
const router = express.Router();

const Usuario = require('../models/usuario'); //obtiene el modelo desde su ubicacion


router.get('/', async (req, res) => {
    const usuario = await Usuario.find(); //carga todos los usuarios
    res.json(usuario); //los envia como respuesta
});

router.get('/:id', async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);//buscaria por id que estaria anclado a una fecha
    res.json(usuario);
});


router.post('/', async (req, res) => {
    const { nombre, apellidos, username, password, activo, rol } =  req.body; //del body guarda los parametros indicados
    const usuario = new Usuario({ nombre, apellidos, username, password, activo, rol }); //crea un nuevo producto con esos parametros
    await usuario.save(); //almacena el producto en la base de datos
    res.json({status: 'Usuario creado'}); //respuesta de producto creado
});

router.put('/:id', async (req, res) => {
    const { nombre, apellidos, username, password, activo, rol } = req.body;
    const nuevoUsuario = { nombre, apellidos, username, password, activo, rol };
    await Usuario.findByIdAndUpdate(req.params.id, nuevoUsuario); //busca por id y actualiza
    res.json({status: 'Usuario actualizado'}); //respuesta de producto actualizado
});



module.exports = router;
