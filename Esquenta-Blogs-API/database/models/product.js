module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'products'
  });

  return Product;
};