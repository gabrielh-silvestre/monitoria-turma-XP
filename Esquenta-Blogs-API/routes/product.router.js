const { Router } = require('express');
const rescue = require('express-rescue');

const ProductController = require('../controller/product.controller');
const ProductValidator = require('../middleware/product.validator');

const router = Router();

router.get('/', rescue(ProductController.findAll));

router.post(
  '/',
  rescue(ProductValidator.createValidation),
  rescue(ProductController.create)
);

router.put(
  '/:id',
  rescue(ProductValidator.createValidation),
  rescue(ProductController.update)
);

router.delete('/:id', rescue(ProductController.remove));

module.exports = router;
