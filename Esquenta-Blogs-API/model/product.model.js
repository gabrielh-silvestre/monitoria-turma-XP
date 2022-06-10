const { Product } = require('../database/models');

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

  return product;
};

const create = async ({ name, quantity }) => {
  const newProduct = await Product.create({ name, quantity });

  return newProduct;
};

const update = async ({ id, name, quantity }) => {
  const product = await Product.findByPk(id);

  product.name = name;
  product.quantity = quantity;
  await product.save();

  return product;

  // await Product.update(
  //   { name, quantity },
  //   {
  //     where: {
  //       id,
  //     },
  //   }
  // );

  // return {
  //   id,
  //   name,
  //   quantity,
  // };
};

const remove = async ({ id }) => {
  const product = await Product.findByPk(id);

  await product.destroy();

  // await Product.destroy({ where: { id } });
};

module.exports = { findAll, findById, findByName, create, update, remove };
