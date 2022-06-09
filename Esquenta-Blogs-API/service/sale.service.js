const { NotFoundError, InternalError } = require('restify-errors');

const SaleModel = require('../model/sale.model');
const ProductModel = require('../model/product.model');

const findAll = async () => {
  const sale = await SaleModel.findAll();

  return {
    statusCode: 200,
    data: sale,
  };
};

const create = async (products) => {
  const productsExists = products.map(async ({ productId }) => {
    const product = await ProductModel.findById({ id: productId });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  });

  await Promise.all(productsExists);

  const sale = await SaleModel.create(products);

  if (!sale) {
    throw new InternalError('Error while creating sale');
  }

  return {
    statusCode: 201,
    data: sale,
  };
};

module.exports = { findAll, create };
