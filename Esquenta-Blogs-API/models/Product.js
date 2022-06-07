module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
  });

  // Product.associate = (models) => {
  //   Product.hasMany(models.Sale, {
  //     foreignKey: 'productId',
  //     as: 'sales',
  //     through: 'sales_products',
  //     otherKey: 'saleId',
  //   });
  // };

  return Product;
};
