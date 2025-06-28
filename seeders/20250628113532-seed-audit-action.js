'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('AUDIT_ACTION', [
      {
        ID: 1,
        ID_USER_LOGIN_DETAIL: 1,
        USER_ACTION: 'Seed Order Placed',
        START_DATE_TIME: new Date(),
        END_DATE_TIME: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('AUDIT_ACTION', null, {});
  }
};
