const express = require('express');
const router = express.Router();
const { 
  getArticulos, 
  createArticulo, 
  updateArticulo, 
  deleteArticulo, 
  deleteAllArticulos 
} = require('../controllers/articulosController');

router.get('/', getArticulos); 
router.post('/', createArticulo);
router.put('/:id', updateArticulo);
router.delete('/:id', deleteArticulo);
router.delete('/', deleteAllArticulos);

module.exports = router;