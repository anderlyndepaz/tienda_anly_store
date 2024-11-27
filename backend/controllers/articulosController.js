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
    console.log(req.body); // Verifica lo que estás recibiendo en el cuerpo de la solicitud

    const { nombre, categoria, precio, descripcion, imagen } = req.body;
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


const updateArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria, precio, descripcion, imagen } = req.body;

    const articulo = await Articulo.findByPk(id);
    if (!articulo) {
      return res.status(404).json({ error: 'Artículo no encontrado.' });
    }

    await articulo.update({ nombre, categoria, precio, descripcion, imagen });
    res.status(200).json(articulo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al actualizar artículo: ${error.message}` });
  }
};

const deleteArticulo = async (req, res) => {
  try {
    const { id } = req.params;

    const articulo = await Articulo.findByPk(id);
    if (!articulo) {
      return res.status(404).json({ error: 'Artículo no encontrado.' });
    }

    await articulo.destroy();
    res.status(200).json({ message: 'Artículo eliminado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar artículo: ${error.message}` });
  }
};


const deleteAllArticulos = async (req, res) => {
  try {
    await Articulo.destroy({ where: {} });
    res.status(200).json({ message: 'Todos los artículos han sido eliminados.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al eliminar todos los artículos: ${error.message}` });
  }
};

module.exports = {
  getArticulos,
  createArticulo,
  updateArticulo,
  deleteArticulo,
  deleteAllArticulos,
};