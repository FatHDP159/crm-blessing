
const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresaController');

router.get('/', controller.getEmpresas);
router.post('/', controller.createEmpresa);

module.exports = router;
