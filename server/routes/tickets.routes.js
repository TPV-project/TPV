//Configuracion de rutas
const express = require('express');
const router = express.Router();

const Ticket = require('../models/ticket'); //obtiene el modelo desde su ubicacion

router.get('/', async (req, res) => {
    const tickets = await Ticket.find(); //carga todos los tickets
    res.json(tickets); //los envia como respuesta
});

router.post('/', async (req, res) => {
    const { listaProductos, total, fecha, efectivo, cambio, barra } =  req.body; //del body guarda los parametros indicados
    const ticket = new Ticket({ listaProductos, total, fecha, efectivo, cambio, barra }); //crea un nuevo ticket con esos parametros
    await ticket.save(); //almacena el ticket en la base de datos
    res.json({status: 'Ticket creado'}); //respuesta de ticket creado
});

module.exports = router;
