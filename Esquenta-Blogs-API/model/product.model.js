const { Product } = require('../database/models')

const findAll = async () => {
  const product = await Product.findAll();
  return product;
};

const findById = async ({ id }) => {
  // formato do parâmetro
  /*
    '1' OU 1
    pode receber um id como string ou number
  */

  // retorna um produto ou null caso não exista
  /*
  Produto encontrado:

    {
      id: 1,
      name: "Martelo do Thor",
      quantity: 10,
    }
  */

      /*
  Produto não encontrado:

    null
  */
};

const findByName = async ({ name }) => {
  // formato do parâmetro
  /*
    'Martelo do Thor'
    string
  */

  // retorna um produto ou null caso não exista
  /*
    Produto encontrado:

    {
      id: 1,
      name: "Martelo do Thor",
      quantity: 10,
    }
  */

  /*
    Produto não encontrado:

    null
  */
};

const create = async ({ name, quantity }) => {
  // formato do parâmetro
  /*
    'Martelo do Thor', 10
    {
      name: string
      quantity: number
    }
  */

  // retorna o produto criado
  /*
    {
      id: 4,
      name: "Armadura do Homem de Ferro",
      quantity: 50,
    }
  */
};

const update = async ({ id, name, quantity }) => {
  // formato do parâmetro
  /*
    '1', 'Trem do Thor', 15
    {
      id: number OU string
      name: string
      quantity: number
    }
  */

  // retorna o produto atualizado
  /*
    {
      id: 1,
      name: "Trem do Thor",
      quantity: 15,
    }
  */
};

const remove = async ({ id }) => {
  // não retorna nada
};

module.exports = { findAll, findById, findByName, create, update, remove };
