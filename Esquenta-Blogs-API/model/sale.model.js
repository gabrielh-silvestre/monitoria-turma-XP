const { Sale, Product } = require('../database/models')

const findAll = async () => {
  const sale = await Sale.findAll({
    include: [
      {
        model: Product,
        as: 'product',
        through: { attributes: [] },
      },
    ],
  });

  return sale;
};

const create = async (products) => {
  // retorna a venda criada
  /*
  formato da venda:
  {
    id,
    date,
  }
  */
};

module.exports = { findAll, create };
