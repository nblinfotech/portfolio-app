'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ORDER_DETAIL', {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ID_SECURITY_DETAIL: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ORDER_REF_NO: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      ORDER_STATUS: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TRANSACTION_TYPE: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ORDER_VALUE: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      CREATED_BY: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      CREATED_ON: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('ORDER_DETAIL');
  }
};
