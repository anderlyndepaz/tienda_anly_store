const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario'); 

const Pedido = sequelize.define(
  'Pedido',
  {
    id_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cuenta_pagar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    id_users: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: 'ID_users',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'pedido',
    timestamps: false,
  }
);

Pedido.belongsTo(Usuario, { foreignKey: 'id_users', onDelete: 'CASCADE' });

module.exports = Pedido;

