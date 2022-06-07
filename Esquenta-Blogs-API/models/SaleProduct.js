module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    'SaleProduct',
    {
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
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'sales_products',
    }
  );

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });

    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
  };

  return SaleProduct;
};
