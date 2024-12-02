const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Usuario = require('./Usuario');
const Articulo = require('./Articulo');

const Favorito = sequelize.define(
  'favoritos',
  {
    id_favoritos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_articulos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Articulo,
        key: 'id_articulos',
      },
      onDelete: 'CASCADE',
    },
    id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id_users',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'favoritos',
    timestamps: false,
  }
);

Favorito.belongsTo(Usuario, { foreignKey: 'id_users', onDelete: 'CASCADE' });
Favorito.belongsTo(Articulo, { foreignKey: 'id_articulos', onDelete: 'CASCADE' });

module.exports = Favorito;
