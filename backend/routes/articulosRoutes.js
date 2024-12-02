const express = require('express');
const router = express.Router();
const { 
  getArticulos, 
  createArticulo, 
  deleteArticulo, 
} = require('../controllers/articulosController');

router.get('/', getArticulos); 
router.post('/', createArticulo);
router.delete('/:id', deleteArticulo);

module.exports = router;