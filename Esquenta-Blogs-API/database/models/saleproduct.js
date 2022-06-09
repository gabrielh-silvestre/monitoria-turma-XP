module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    productId: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER
    }, 
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'sales_products'
  });

  SalesProduct.associate = ({ Product, Sale }) => {
    Product.belongsToMany(Sale, {
      as: 'sale',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });

    Sale.belongsToMany(Product, {
      as: 'product',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  }

  return SalesProduct;
};