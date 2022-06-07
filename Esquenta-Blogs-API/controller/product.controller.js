const ProductService = require('../service/product.service');

const findAll = async (_req, res) => {
  const { statusCode, data } = await ProductService.findAll();

  return res.status(statusCode).json(data);
};

const create = async (req, res) => {
  const { statusCode, data } = await ProductService.create(req.body);

  return res.status(statusCode).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { statusCode, data } = await ProductService.update({
    id,
    name,
    quantity,
  });

  return res.status(statusCode).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const { statusCode } = await ProductService.remove({ id });

  return res.status(statusCode).end();
};

module.exports = { findAll, create, update, remove };
