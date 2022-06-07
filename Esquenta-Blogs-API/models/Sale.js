module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: 'sales',
    }
  );

  return Sale;
};
