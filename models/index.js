const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const OrderDetail = require('./OrderDetail')(sequelize, Sequelize.DataTypes);
const AccountDetail = require('./AccountDetail')(sequelize, Sequelize.DataTypes);
const SecurityDetail = require('./SecurityDetail')(sequelize, Sequelize.DataTypes);
const AuditAction = require('./AuditAction')(sequelize, Sequelize.DataTypes);


// === Associations ===

// OrderDetail belongsTo SecurityDetail
OrderDetail.belongsTo(SecurityDetail, {
    foreignKey: 'ID_SECURITY_DETAIL',
    as: 'security'
});



// AccountDetail belongsTo OrderDetail
AccountDetail.belongsTo(OrderDetail, {
    foreignKey: 'ID_ORDER_DETAIL',
    as: 'order'
});


// Optional: OrderDetail hasOne AccountDetail
OrderDetail.hasOne(AccountDetail, {
    foreignKey: 'ID_ORDER_DETAIL',
    as: 'account'
});

module.exports = {
    sequelize,
    Sequelize,
    OrderDetail,
    AccountDetail,
    SecurityDetail,
    AuditAction
};
