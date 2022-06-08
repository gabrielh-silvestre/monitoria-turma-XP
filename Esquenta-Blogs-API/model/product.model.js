const findAll = async () => {
  const product = await Product.findAll();
  return product;
};

const findById = async ({ id }) => {
  // retorna um produto ou null caso não exista
};

const findByName = async ({ name }) => {
  // retorna um produto ou null caso não exista
};

const create = async ({ name, quantity }) => {
  // retorna o produto criado
};

const update = async ({ id, name, quantity }) => {
  // retorna o produto atualizado
};

const remove = async ({ id }) => {
  // não retorna nada
};

module.exports = { findAll, findById, findByName, create, update, remove };
