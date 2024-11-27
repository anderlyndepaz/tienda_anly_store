const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Articulo = sequelize.define('Articulo', {
  id_articulos: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  imagen: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'articulos', 
  timestamps: false, 
});

module.exports = Articulo;

