module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    date: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    }
  }, {
    timestamps: false,
    tableName: 'sales'
  });

  return Sale;
};