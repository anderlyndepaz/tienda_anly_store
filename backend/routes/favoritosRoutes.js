const express = require('express');
const favoritosController = require('../controllers/favoritosController');

const router = express.Router();

router.get('/', favoritosController.obtenerTodosFavoritos);
router.put('/:id', favoritosController.editarFavorito);
router.delete('/:id', favoritosController.eliminarFavorito);

module.exports = router;
