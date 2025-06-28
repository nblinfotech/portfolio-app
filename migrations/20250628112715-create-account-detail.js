'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ACCOUNT_DETAIL', {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ID_USER_LOGIN_DETAIL: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      CREDIT: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      DEBIT: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      RUNNING_BALANCE: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 10000
      },
      ID_ORDER_DETAIL: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      CREATED_BY: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      CREATED_ON: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ACCOUNT_DETAIL');
  }
};
