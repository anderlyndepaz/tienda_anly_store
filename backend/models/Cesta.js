const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./Pedido');
const Articulo = require('./Articulo');

const Cesta = sequelize.define('Cesta', {
  ID_cesta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ID_pedido: { type: DataTypes.INTEGER, references: { model: Pedido, key: 'ID_pedido' } },
  ID_articulos: { type: DataTypes.INTEGER, references: { model: Articulo, key: 'ID_articulos' } },
}, {
  tableName: 'cesta',
  timestamps: false,
});

module.exports = Cesta;
