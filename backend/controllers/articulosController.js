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
    console.log(req.body); 

    const { nombre, categoria, precio, descripcion, imagen } = req.body; //ante la duda, destructuring
    if (!nombre || !precio) { //comprueba que hay datos
      return res.status(400).json({ error: 'El nombre y el precio son obligatorios.' });
    }

    const nuevoArticulo = await Articulo.create({
      nombre,
      categoria,
      precio,
      descripcion,
      imagen,
    }); //creamos el modelito

    res.status(201).json(nuevoArticulo);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: `Error al crear artículo: ${error.message}` });
  }
};


const deleteArticulo = async (req, res) => {
  try {
    const { id } = req.params;

    const articulo = await Articulo.findByPk(id); //buscamos pk, gracias sequelize
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
  deleteArticulo,
  deleteAllArticulos,
};