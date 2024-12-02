const express = require('express');
const router = express.Router();
const { getCesta, deleteArticuloCesta, addArticuloToCesta } = require('../controllers/cestaController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/:id_pedido', authenticateToken, addArticuloToCesta);
router.get('/', getCesta);
router.delete('/:id', deleteArticuloCesta);

module.exports = router;