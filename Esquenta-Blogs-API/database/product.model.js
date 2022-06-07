const findAll = async () => {
  // retorna todos os produtos ou um array vazio caso não existam produtos
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
