//Configuracion de rutas
const express = require('express');
const router = express.Router();

const Categoria = require('../models/categoria'); //obtiene el modelo desde su ubicacion


router.get('/', async (req, res) => {
    const categoria = await Categoria.find(); //carga todos los categorias de cada dia 
    res.json(categoria); //los envia como respuesta
});

router.get('/:id', async (req, res) => {
    const categoria = await Categoria.findById(req.params.id);//buscaria por id que estaria anclado a una fecha 
    res.json(categoria);
});


router.post('/', async (req, res) => {
    const { nombre } =  req.body; //del body guarda los parametros indicados
    const categoria = new Categoria({ nombre }); //crea un nuevo categoria con esos parametros
    await categoria.save(); //almacena el categoria en la base de datos
    res.json({status: 'Registro de categoria concluido creado'}); //respuesta de categoria creado
});

router.put('/:id', async (req, res) => {
    const { nombre } = req.body;
    const nuevaCategoria = { nombre };
    await categoria.findByIdAndUpdate(req.params.id, nuevaCategoria); //busca por id y actualiza
    res.json({status: 'Categoria actualizado'}); //respuesta de categoria actualizado
});

router.delete('/:id', async (req, res) => {
    await Categoria.findByIdAndDelete(req.params.id); //busca por id y elimina
    res.json({status: 'Categoria eliminado'}); //respuesta de producto eliminado
});


module.exports = router;