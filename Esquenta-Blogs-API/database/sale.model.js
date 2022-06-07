const { Sale, Product, SaleProduct, sequelize } = require('../models');

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
  const createTransaction = await sequelize.transaction();

  try {
    const sale = await Sale.create({ transaction: createTransaction });

    const attProducts = products.map(async (p) => {
      const product = await Product.findByPk(p.id);

      product.quantity -= p.quantity;
      await product.save({ transaction: createTransaction });

      await SaleProduct.create({ saleId: sale.id, productId: p.id });

      return product;
    });

    await Promise.all(attProducts);

    return sale;
  } catch (error) {
    await createTransaction.rollback();
    return null;
  }
};

module.exports = { findAll, create };
