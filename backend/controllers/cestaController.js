const Cesta = require('../models/Cesta');
const Articulo = require('../models/Articulo'); 


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

module.exports = { getCesta, deleteArticuloCesta, deleteAllCesta };
