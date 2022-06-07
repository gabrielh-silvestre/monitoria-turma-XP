const { Router } = require('express');
const rescue = require('express-rescue');

const SaleController = require('../controller/sale.controller');
const SaleValidator = require('../middleware/sale.validator');

const router = Router();

router.get('/', rescue(SaleController.findAll));

router.post(
  '/',
  rescue(SaleValidator.createValidation),
  rescue(SaleController.create)
);

module.exports = router;
