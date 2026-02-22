const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidoController');

router.get('/', controller.getAll);
router.post('/', controller.create);

module.exports = router;