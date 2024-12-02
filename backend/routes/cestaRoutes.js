const express = require('express');
const router = express.Router();
const { getCesta, deleteArticuloCesta, deleteAllCesta, addArticuloToCesta } = require('../controllers/cestaController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/:id_pedido', authenticateToken, addArticuloToCesta);
router.get('/', getCesta);
router.delete('/:id', deleteArticuloCesta);
router.delete('/', deleteAllCesta);

module.exports = router;