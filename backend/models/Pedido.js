const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Pedido = sequelize.define('Pedido', {
  ID_pedido: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  cuenta_pagar: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  fecha_pedido: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  ID_users: { type: DataTypes.INTEGER, references: { model: Usuario, key: 'ID_users' } },
}, {
  tableName: 'pedido',
  timestamps: false,
});

module.exports = Pedido;
