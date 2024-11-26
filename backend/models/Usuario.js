const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  ID_users: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  apellido: { type: DataTypes.STRING(100), allowNull: false },
  correo_electronico: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  direccion: { type: DataTypes.TEXT },
  numero_telefono: { type: DataTypes.STRING(15) },
  contraseña: { type: DataTypes.STRING(255), allowNull: false },
  rol: { type: DataTypes.STRING(20), defaultValue: 'usuario' },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = Usuario;
