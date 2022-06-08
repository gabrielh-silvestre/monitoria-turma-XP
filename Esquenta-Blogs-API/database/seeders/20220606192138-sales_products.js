'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('sales_products', [
      {
        sale_id: 1,
        product_id: 1,
        quantity: 5,
      },
      {
        sale_id: 1,
        product_id: 2,
        quantity: 10,
      },
      {
        sale_id: 2,
        product_id: 3,
        quantity: 30,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sales_products', null, {});
  },
};
