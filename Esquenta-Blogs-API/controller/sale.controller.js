const SaleService = require('../service/sale.service');

const findAll = async (_req, res) => {
  const { statusCode, data } = await SaleService.findAll();

  res.status(statusCode).json(data);
};

const create = async (req, res) => {
  const { statusCode, data } = await SaleService.create(req.body);

  res.status(statusCode).json(data);
};

module.exports = { findAll, create };
