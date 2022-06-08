'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        date: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        date: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
