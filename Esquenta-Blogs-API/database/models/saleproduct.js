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
      as: 'sale', // apelido ou nome da associação (relacionado a model da direita)
      through: SalesProduct, // model que a associação "atravessará"
      foreignKey: 'productId', // chave estrangeira da model principal (da esquerda)
      otherKey: 'saleId', // chave estrangeira da model secundária (da direita)
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