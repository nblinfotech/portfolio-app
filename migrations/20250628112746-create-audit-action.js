'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AUDIT_ACTION', {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ID_USER_LOGIN_DETAIL: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      USER_ACTION: {
        type: Sequelize.STRING,
        allowNull: false
      },
      START_DATE_TIME: {
        type: Sequelize.DATE,
        allowNull: false
      },
      END_DATE_TIME: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('AUDIT_ACTION');
  }
};
