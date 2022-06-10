const { Sale, Product, SalesProduct } = require('../database/models')

const findAll = async () => {
  const sale = await Sale.findAll({
    include: [
      {
        model: Product,
        as: 'products',
        through: { attributes: [] },
      },
    ],
  });
  return sale;
};

const create = async (products) => {
  const sale = await Sale.create();

  const attProducts = products.map(async ({ productId, quantity }) => {
    await SalesProduct.create({
      saleId: sale.id,
      productId,
      quantity,
    });

    const product = await Product.findByPk(productId);

    product.quantity -= quantity;
    await product.save();

    return product;
  });

  await Promise.all(attProducts);

  return sale;
};

module.exports = { findAll, create };
