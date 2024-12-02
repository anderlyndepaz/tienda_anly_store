const express = require('express');
const router = express.Router();
const {
  getPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
  createPedido,
} = require('../controllers/pedidosController');
const authenticateToken = require('../middlewares/authMiddleware');


router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);
router.post('/create', authenticateToken, createPedido);

module.exports = router; 