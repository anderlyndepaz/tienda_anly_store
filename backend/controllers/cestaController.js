const Cesta = require('../models/Cesta');
const Articulo = require('../models/Articulo'); 
const Pedido = require('../models/Pedido');

const addArticuloToCesta = async (req, res) => {
  try {
    const { id_articulos, cantidad } = req.body;  // Artículo que se va a agregar
    const { id_pedido } = req.params;  // El id del pedido en el que se va a agregar el artículo

    // Verificar que el pedido existe
    const pedido = await Pedido.findByPk(id_pedido);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Verificar que el artículo existe
    const articulo = await Articulo.findByPk(id_articulos);
    if (!articulo) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    // Crear el registro en la tabla Cesta
    const cesta = await Cesta.create({
      id_pedido,
      id_articulos,
      cantidad,
    });

    res.status(200).json({
      message: 'Artículo añadido a la cesta',
      cesta,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al añadir el artículo a la cesta' });
  }
};


const getCesta = async (req, res) => {
  try {
    const cesta = await Cesta.findAll({
      include: {
        model: Articulo,
        attributes: ['nombre', 'precio', 'descripcion'],
      },
    });
    res.status(200).json(cesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la cesta' });
  }
};

const deleteArticuloCesta = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Cesta.destroy({ where: { ID_cesta: id } });

    if (!resultado) {
      return res.status(404).json({ error: 'Artículo no encontrado en la cesta' });
    }

    res.status(200).json({ message: 'Artículo eliminado de la cesta' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el artículo de la cesta' });
  }
};


const deleteAllCesta = async (req, res) => {
  try {
    await Cesta.destroy({ where: {} }); 
    res.status(200).json({ message: 'Todos los artículos de la cesta han sido eliminados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar todos los artículos de la cesta' });
  }
};

module.exports = { getCesta, deleteArticuloCesta, deleteAllCesta, addArticuloToCesta };