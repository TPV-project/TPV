//Configuracion de rutas
const express = require('express');
const router = express.Router();

const Rol = require('../models/rol'); //obtiene el modelo desde su ubicacion


router.get('/', async (req, res) => {
    const rol = await Rol.find(); //carga todos los roles
    res.json(rol); //los envia como respuesta
});

router.get('/:id', async (req, res) => {
    const rol = await Rol.findById(req.params.id);//buscaria por id que estaria anclado a una fecha
    res.json(rol);
});


router.post('/', async (req, res) => {
    const { tipo } =  req.body; //del body guarda los parametros indicados
    const rol = new Rol({ tipo }); //crea un nuevo producto con esos parametros
    await rol.save(); //almacena el producto en la base de datos
    res.json({status: 'Registro de rol creado'}); //respuesta de producto creado
});

router.put('/:id', async (req, res) => {
    const { tipo } = req.body;
    const rol = { tipo };
    await Rol.findByIdAndUpdate(req.params.id, rol); //busca por id y actualiza
    res.json({status: 'Rol actualizado'}); //respuesta de producto actualizado
});



module.exports = router;
