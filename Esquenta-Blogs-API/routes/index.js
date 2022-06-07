const { Router } = require('express');

const productRouter = require('./product.router');
const saleRouter = require('./sale.router');

const router = Router();

router.use('/products', productRouter);
router.use('/sales', saleRouter);

module.exports = router;
