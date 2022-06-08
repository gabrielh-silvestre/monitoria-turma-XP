module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'products',
    }
  );

  return Product;
};
