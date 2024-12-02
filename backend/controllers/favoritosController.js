const Favorito = require('../models/Favorito');
const Articulo = require('../models/Articulo');
const Usuario = require('../models/Usuario');

const crearFavorito = async (req, res) => {
  try {
    const { id_articulos, id_users } = req.body;
    if (!id_articulos || !id_users) {
      return res.status(400).json({ error: 'Faltan datos requeridos: id_articulos o id_users' });
    }

    const articulo = await Articulo.findByPk(id_articulos);
    if (!articulo) {
      return res.status(404).json({ error: 'El artículo no existe' });
    }

    const usuario = await Usuario.findByPk(id_users);
    if (!usuario) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    const favoritoExistente = await Favorito.findOne({
      where: { id_articulos, id_users }
    });

    if (favoritoExistente) {
      return res.status(400).json({
        error: 'Este artículo ya está marcado como favorito por este usuario',
      });
    }

    const nuevoFavorito = await Favorito.create({
      id_articulos,
      id_users,
    });

    res.status(201).json({
      message: 'Favorito creado correctamente',
      favorito: nuevoFavorito,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el favorito', detalles: error.message });
  }
};


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
  crearFavorito,
};
