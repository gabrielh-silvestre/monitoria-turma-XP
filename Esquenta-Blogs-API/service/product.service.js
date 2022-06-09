const { ConflictError, NotFoundError } = require('restify-errors');

const ProductModel = require('../model/product.model');

const findAll = async () => {
  const products = await ProductModel.findAll();

  return {
    statusCode: 200,
    data: products,
  };
};

const create = async ({ name, quantity }) => {
  const productAlreadyExists = await ProductModel.findByName({ name });

  if (productAlreadyExists) {
    throw new ConflictError('Product already exists');
  }

  const product = await ProductModel.create({ name, quantity });

  return {
    statusCode: 201,
    data: product,
  };
};

const update = async ({ id, name, quantity }) => {
  const productExists = await ProductModel.findById({ id });

  if (!productExists) {
    throw new NotFoundError('Product not found');
  }

  const updatedProduct = await ProductModel.update({ id, name, quantity });

  return {
    statusCode: 200,
    data: updatedProduct,
  };
};

const remove = async ({ id }) => {
  const productExists = await ProductModel.findById({ id });

  if (!productExists) {
    throw new NotFoundError('Product not found');
  }

  await ProductModel.remove({ id });

  return { statusCode: 204 };
};

module.exports = { findAll, create, update, remove };
