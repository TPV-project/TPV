//Configuracion de rutas
const express = require('express');
const router = express.Router();

const Caja = require('../models/caja'); //obtiene el modelo desde su ubicacion


router.get('/', async (req, res) => {
    const caja = await Caja.find(); //carga todos los cajas de cada dia 
    res.json(caja); //los envia como respuesta
});

router.get('/:id', async (req, res) => {
    const caja = await Caja.findById(req.params.id);//buscaria por id que estaria anclado a una fecha 
    res.json(caja);
});


router.post('/', async (req, res) => {
    const { cajaInicial, cajaFinal, sumaTarjeta, fecha } =  req.body; //del body guarda los parametros indicados
    const caja = new Caja({ cajaInicial, cajaFinal, sumaTarjeta, fecha}); //crea una nueva caja con esos parametros
    await caja.save(); //almacena la caja en la base de datos
    res.json({status: 'Registro de caja concluido creado'}); //respuesta de caja creado
});

router.put('/:id', async (req, res) => {
    const { cajaInicial, cajaFinal, sumaTarjeta, fecha} = req.body;
    const nuevaCaja = { cajaInicial, cajaFinal, sumaTarjeta, fecha};
    await Caja.findByIdAndUpdate(req.params.id, nuevaCaja); //busca por id y actualiza
    res.json({status: 'Caja actualizada'}); //respuesta de caja actualizado
});
router.delete('/:id', async (req, res) => {
    await Caja.findByIdAndDelete(req.params.id); //busca por id y elimina
    res.json({status: 'Caja eliminada'}); //respuesta de caja eliminado
});

module.exports = router;