const { Router } = require('express');
const rescue = require('express-rescue');

const ProductController = require('../controller/product.controller');

const router = Router();

router.get('/', rescue(ProductController.findAll));
router.post('/', rescue(ProductController.create));
router.put('/:id', rescue(ProductController.update));
router.delete('/:id', rescue(ProductController.remove));

module.exports = router;
