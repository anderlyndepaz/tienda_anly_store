const Usuario = require('../models/Usuario');

const obtenerTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios', detalles: error.message });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario', detalles: error.message });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo_electronico, direccion, numero_telefono, contraseña, rol } =
      req.body;
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo_electronico,
      direccion,
      numero_telefono,
      contraseña,
      rol,
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario', detalles: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo_electronico, direccion, numero_telefono, contraseña, rol } =
      req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.update({
      nombre,
      apellido,
      correo_electronico,
      direccion,
      numero_telefono,
      contraseña,
      rol,
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario', detalles: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await usuario.destroy(); //metodo para eliminar registro 
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario', detalles: error.message });
  }
};

module.exports = {
  obtenerTodosUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
