const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./Pedido');
const Articulo = require('./Articulo'); 


const Cesta = sequelize.define('cesta', {
  id_cesta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Pedido', 
      key: 'id_pedido',
    },
    onDelete: 'CASCADE',
  },
  id_articulos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Articulos', 
      key: 'id_articulos',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'cesta', 
  timestamps: false, 
});


Cesta.belongsTo(Pedido, { foreignKey: 'id_pedido', onDelete: 'CASCADE' });
Cesta.belongsTo(Articulo, { foreignKey: 'id_articulos', onDelete: 'CASCADE' }); //belongsTo indica una relacion many to one 

Pedido.hasMany(Cesta, { foreignKey: 'id_pedido' }); // hasMany indica una relacion one to many 
Articulo.hasMany(Cesta, { foreignKey: 'id_articulos' });

module.exports = Cesta;
