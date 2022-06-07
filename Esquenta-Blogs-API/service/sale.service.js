const { InternalError } = require('restify-errors');

const SaleModel = require('../database/sale.model');

const findAll = async () => {
  const sale = await SaleModel.findAll();

  return {
    statusCode: 200,
    data: sale,
  };
};

const create = async (products) => {
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
