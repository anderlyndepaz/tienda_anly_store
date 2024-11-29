const express = require('express');
const router = express.Router();
const { getCesta, deleteArticuloCesta, deleteAllCesta, postCesta } = require('../controllers/cestaController');

router.get('/', getCesta);
router.delete('/:id', deleteArticuloCesta);
router.delete('/', deleteAllCesta);
router.post('/', postCesta);

module.exports = router;
