const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('Error de conexión:', err));

module.exports = sequelize;


// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_DATABASE, 
//   process.env.DB_USER, 
//   process.env.DB_PASSWORD, 
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres',
//     dialectOptions: {
//       connectTimeout: 20000,  // Aumenta el tiempo de espera a 20 segundos
//     },
//     logging: false,
//   }
// );

// sequelize.authenticate()
//   .then(() => console.log('Conexión a la base de datos exitosa'))
//   .catch((err) => console.error('Error de conexión:', err));

// module.exports = sequelize;