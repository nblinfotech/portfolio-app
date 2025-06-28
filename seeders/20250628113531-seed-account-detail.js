'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ACCOUNT_DETAIL', [
      {
        ID: 1,
        ID_USER_LOGIN_DETAIL: 1,
        CREDIT: 0,
        DEBIT: 0,
        RUNNING_BALANCE: 10000,
        ID_ORDER_DETAIL: 1,
        CREATED_BY: 1,
        CREATED_ON: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ACCOUNT_DETAIL', null, {});
  }
};
