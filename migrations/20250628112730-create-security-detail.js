'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SECURITY_DETAIL', {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      SECURITY_NAME: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      VALUE: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('SECURITY_DETAIL');
  }
};
