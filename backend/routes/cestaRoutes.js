const express = require('express');
const router = express.Router();
const { getCesta, deleteArticuloCesta, deleteAllCesta } = require('../controllers/cestaController');

router.get('/', getCesta);
router.delete('/:id', deleteArticuloCesta);
router.delete('/', deleteAllCesta);

module.exports = router;
