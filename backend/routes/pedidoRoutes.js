const express = require('express');
const router = express.Router();
const {
  getPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
  crearPedido,
} = require('../controllers/pedidosController');

router.post('/', crearPedido);
router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

module.exports = router; 
