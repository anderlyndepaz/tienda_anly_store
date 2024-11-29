const express = require('express');
const sequelize = require('./config/database');
const cestaRoutes = require('./routes/cestaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const articulosRoutes = require('./routes/articulosRoutes'); 
const usuariosRoutes = require('./routes/usuariosRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors'); //para aceptar todos los orgines. backend-front 
const morgan = require('morgan');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Rutas
app.use('/api/articulos', articulosRoutes); 
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/cesta', cestaRoutes); 
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/auth', authRoutes);


// app.use('*', manage404);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('Error de conexión:', err));
