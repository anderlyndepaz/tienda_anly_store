const express = require('express');
const router = express.Router();
const {
  getPedidos,
  getPedidoById,
  deletePedido,
  createPedido,
} = require('../controllers/pedidosController');
const authenticateToken = require('../middlewares/authMiddleware');


router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.delete('/:id', deletePedido);
router.post('/create', authenticateToken, createPedido);

module.exports = router; 