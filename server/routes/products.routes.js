//Configuracion de rutas
const express = require('express');
const router = express.Router();

const Producto = require('../models/producto'); //obtiene el modelo desde su ubicacion



router.route('/').get((req, res)=> {
    Producto.find()
    .then(productos => res.json(productos))
    .catch(err=> res.status(400).json ('Error: '+err));
});
router.get('/', async (req, res) => {
    const productos = await Producto.find(); //carga todos los productos
    res.json(productos); //los envia como respuesta
});

router.get('/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
});

router.post('/', async (req, res) => {
    const { nombre, precio_llevar, precio_barra, cocina, categoria } =  req.body; //del body guarda los parametros indicados
    const producto = new Producto({ nombre, precio_llevar, precio_barra, cocina, categoria}); //crea un nuevo producto con esos parametros
    await producto.save(); //almacena el producto en la base de datos
    res.json({status: 'Producto creado'}); //respuesta de producto creado
});

router.put('/:id', async (req, res) => {
    const { nombre, precio_llevar, precio_barra, cocina, categoria } = req.body;
    const nuevoproducto = { nombre, precio_llevar, precio_barra, cocina, categoria };
    await Producto.findByIdAndUpdate(req.params.id, nuevoproducto); //busca por id y actualiza
    res.json({status: 'Producto actualizado'}); //respuesta de producto actualizado
});

router.delete('/:id', async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id); //busca por id y elimina
    res.json({status: 'Producto eliminado'}); //respuesta de producto eliminado
});

module.exports = router;
