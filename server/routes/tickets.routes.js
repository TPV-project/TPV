//Configuracion de rutas
const express = require('express');
const router = express.Router();

const Ticket = require('../models/ticket'); //obtiene el modelo desde su ubicacion

router.get('/', async (req, res) => {
    const tickets = await Ticket.find(); //carga todos los tickets
    res.json(tickets); //los envia como respuesta
});

router.get('/:id', async (req, res) => {
    const tickets = await Ticket.findById(req.params.id);
    res.json(tickets);
});

router.post('/', async (req, res) => {
    const { ticketProductos, total, fecha, efectivo, cambio, cantidad, barra } =  req.body; //del body guarda los parametros indicados
    const ticket = new Ticket({ ticketProductos, total, fecha, efectivo, cambio, cantidad, barra }); //crea un nuevo ticket con esos parametros
    console.log(ticket);
    await ticket.save(); //almacena el ticket en la base de datos
    res.json({status: 'JAMON creado'}); //respuesta de ticket creado
});

router.put('/:id', async (req, res) => {
    const { ticketProductos, total, fecha, efectivo, cambio, barra } = req.body;
    const nuevoticket = { ticketProductos, total, fecha, efectivo, cambio, cantidad, barra };
    await Ticket.findByIdAndUpdate(req.params.id, nuevoticket); //busca por id y actualiza
    res.json({status: 'Ticket actualizado'}); //respuesta de ticket actualizado
});

router.delete('/:id', async (req, res) => {
    await Ticket.findByIdAndDelete(req.params.id); //busca por id y elimina
    res.json({status: 'Ticket eliminado'}); //respuesta de ticket eliminado
});

module.exports = router;
