module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: DataTypes.DATE,
  });

  // Sale.associate = (models) => {
  //   Sale.hasMany(models.Product, {
  //     foreignKey: 'saleId',
  //     as: 'products',
  //     through: 'sales_products',
  //     otherKey: 'productId',
  //   });
  // };

  return Sale;
};
