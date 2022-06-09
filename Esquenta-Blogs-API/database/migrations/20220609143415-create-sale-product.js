'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      saleId: {
        primaryKey: true,
        allowNull: false,
        field: 'sale_id',
        type: Sequelize.INTEGER,
        references: {
          model: 'sales',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      productId: {
        primaryKey: true,
        allowNull: false,
        field: 'product_id',
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales_products');
  }
};