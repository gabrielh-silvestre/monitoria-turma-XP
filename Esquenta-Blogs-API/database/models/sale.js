module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    date: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'sales'
  });

  return Sale;
};