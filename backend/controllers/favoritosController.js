const Favorito = require('../models/Favorito');

const obtenerTodosFavoritos = async (req, res) => {
  try {
    const favoritos = await Favorito.findAll();
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos', detalles: error.message });
  }
};

const editarFavorito = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_articulos, id_users } = req.body;

    const favorito = await Favorito.findByPk(id);
    if (!favorito) {
      return res.status(404).json({ error: 'Favorito no encontrado' });
    }

    await favorito.update({
      id_articulos,
      id_users,
    });

    res.status(200).json(favorito);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el favorito', detalles: error.message });
  }
};

const eliminarFavorito = async (req, res) => {
  try {
    const { id } = req.params;

    const favorito = await Favorito.findByPk(id); //para buscar en la tabla find by Primary Key
    if (!favorito) {
      return res.status(404).json({ error: 'Favorito no encontrado' });
    }

    await favorito.destroy();
    res.status(200).json({ message: 'Favorito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el favorito', detalles: error.message });
  }
};

module.exports = {
  obtenerTodosFavoritos,
  editarFavorito,
  eliminarFavorito,
};
