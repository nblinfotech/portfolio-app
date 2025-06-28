const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const OrderDetail = require('./OrderDetail')(sequelize, DataTypes);

// Add associations here if needed

module.exports = { sequelize, OrderDetail };
