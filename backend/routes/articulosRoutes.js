const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');
const { getArticulos, createArticulo } = require('../controllers/articulosController');

router.get('/', async (req, res) => {
  try {
    const articulos = await Articulo.findAll(); // Consulta todos los artículos
    res.status(200).json(articulos); // Retorna los artículos en formato JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los artículos' });
  }
});

router.get('/', getArticulos);

router.post('/', createArticulo);

module.exports = router;
