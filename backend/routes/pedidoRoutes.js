const express = require('express');
const router = express.Router();
const {
  getPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
} = require('../controllers/pedidosController');

router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

module.exports = router; 
