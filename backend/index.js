const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const cestaRoutes = require('./routes/cestaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const articulosRoutes = require('./routes/articulosRoutes'); 
const usuariosRoutes = require('./routes/usuariosRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser'); // Importar cookie-parser
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cookieParser()); // Usar cookie-parser
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));

// Rutas
app.use('/api/articulos', articulosRoutes); 
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/cesta', cestaRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/auth', authRoutes);

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Conexión a la base de datos
sequelize.sync({ alter: true }) // Esto ajustará las discrepancias en las columnas
  .then(() => console.log('Sincronización completada.'))
  .catch(err => console.error('Error al sincronizar:', err));
