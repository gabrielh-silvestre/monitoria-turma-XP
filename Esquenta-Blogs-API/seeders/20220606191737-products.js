'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Martelo do Thor',
        quantity: 10,
      },
      {
        name: 'Traje de encolhimento',
        quantity: 20,
      },
      {
        name: 'Escudo do Capitão América',
        quantity: 30,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
