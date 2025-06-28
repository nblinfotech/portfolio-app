const { AuditAction } = require('../models');

exports.logAuditAction = async (userId, action, transaction) => {
    await AuditAction.create({
        ID_USER_LOGIN_DETAIL: userId,
        USER_ACTION: action,
        START_DATE_TIME: new Date(),
        END_DATE_TIME: new Date()
    }, { transaction });
};
