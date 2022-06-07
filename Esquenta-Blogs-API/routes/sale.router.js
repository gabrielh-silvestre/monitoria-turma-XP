const { Router } = require('express');
const rescue = require('express-rescue');

const SaleController = require('../controller/sale.controller');

const router = Router();

router.get('/', rescue(SaleController.findAll));
router.post('/', rescue(SaleController.create));

module.exports = router;
