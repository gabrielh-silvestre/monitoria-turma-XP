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
  // Formato do parâmetro
  /*
    [
      {
        productId: 1,
        quantity: 10,
      },
      {
        productId: 2,
        quantity: 20,
      }
    ]
  */

  // retorna a venda criada
  /*
    {
      id: 1,
      date: '2022-06-10T11:51:41.000Z',
    }
  */
};

module.exports = { findAll, create };
