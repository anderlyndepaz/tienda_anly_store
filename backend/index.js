const express = require('express');
require('dotenv').config({ path: '../.env' });
require('./config/db');
const sequelize = require('./config/database');


const articulosRoutes = require('./routes/articulosRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/api/articulos', articulosRoutes);

app.get('/', (req, res) => {
    res.send('¡Hola, este es mi backend!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('Error de conexión:', err));
