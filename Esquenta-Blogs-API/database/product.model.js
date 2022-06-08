const { Product } = require('../models');

const findAll = async () => {
  const product = await Product.findAll();
  return product;
};

const findById = async ({ id }) => {
  const product = await Product.findByPk(id);

  return product;
};

const findByName = async ({ name }) => {
  const product = await Product.findOne({ where: { name } });

  return product ? product[0] : null;
};

const create = async ({ name, quantity }) => {
  const product = await Product.create({ name, quantity });
  return product;
};

const update = async ({ id, name, quantity }) => {
  const product = await Product.findByPk(id);

  product.name = name;
  product.quantity = quantity;
  await product.save();

  return product;
};

const remove = async ({ id }) => {
  const product = await Product.findByPk(id);

  await product.destroy();

  return true;
};

module.exports = { findAll, findById, findByName, create, update, remove };
