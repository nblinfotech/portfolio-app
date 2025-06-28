'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ORDER_DETAIL', [
      {
        ID: 1,
        ID_SECURITY_DETAIL: 1,
        ORDER_REF_NO: 'ORD-EXIST1234',
        ORDER_STATUS: 'Submitted',
        TRANSACTION_TYPE: 'Buy',
        ORDER_VALUE: 2500,
        CREATED_BY: 1,
        CREATED_ON: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ORDER_DETAIL', null, {});
  }
};
