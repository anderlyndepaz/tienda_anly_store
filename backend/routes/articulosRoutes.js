const express = require('express');
const router = express.Router();
const { 
  getArticulos, 
  createArticulo, 
  deleteArticulo, 
  deleteAllArticulos 
} = require('../controllers/articulosController');

router.get('/', getArticulos); 
router.post('/', createArticulo);
router.delete('/:id', deleteArticulo);
router.delete('/', deleteAllArticulos);

module.exports = router;