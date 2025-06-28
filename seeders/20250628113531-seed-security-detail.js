'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('SECURITY_DETAIL', [
      { ID: 1, SECURITY_NAME: 'ABC FUND', VALUE: 500 },
      { ID: 2, SECURITY_NAME: 'XYZ BOND', VALUE: 300 },
      { ID: 3, SECURITY_NAME: 'GOLD ETF', VALUE: 1000 }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('SECURITY_DETAIL', null, {});
  }
};
