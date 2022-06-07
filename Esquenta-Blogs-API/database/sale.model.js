const findAll = async () => {
  // retorna todas as vendas ou um array vazio caso não existam vendas
  /*
  formato da venda:
  {
    id,
    date,
    products: [
      {
        id,
        name,
        quantity,
      }
    ]
  }
  */
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
