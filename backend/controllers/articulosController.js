const Articulo = require('../models/Articulo');

const getArticulos = async (req, res) => {
  try {
    const articulos = await Articulo.findAll();
    res.status(200).json(articulos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener artículos' });
  }
};

const createArticulo = async (req, res) => {
  try {
    const { nombre, categoria, precio, descripcion, imagen } = req.body;

    // Validaciones básicas
    if (!nombre || !precio) {
      return res.status(400).json({ error: 'El nombre y el precio son obligatorios.' });
    }

    const nuevoArticulo = await Articulo.create({
      nombre,
      categoria,
      precio,
      descripcion,
      imagen,
    });

    res.status(201).json(nuevoArticulo);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: `Error al crear artículo: ${error.message}` });
  }
};

module.exports = { getArticulos, createArticulo };

