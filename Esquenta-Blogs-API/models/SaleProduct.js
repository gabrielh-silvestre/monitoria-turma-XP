module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      field: 'sale_id',
      references: {
        model: 'sales',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      field: 'product_id',
      references: {
        model: 'products',
        key: 'id',
      },
    },
  });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sale, {
      foreignKey: 'saleId',
      as: 'sales',
      targetKey: 'id',
    });

    SaleProduct.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'products',
      targetKey: 'id',
    });
  };

  return SaleProduct;
};
