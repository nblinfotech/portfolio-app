const { AccountDetail } = require('../models');

exports.updateAccountBalance = async ({
    userId,
    orderId,
    transactionType,
    orderValue,
    newBalance,
    transaction
}) => {
    await AccountDetail.create({
        ID_USER_LOGIN_DETAIL: userId,
        CREDIT: transactionType === 'Sell' ? orderValue : 0,
        DEBIT: transactionType === 'Buy' ? orderValue : 0,
        RUNNING_BALANCE: newBalance,
        ID_ORDER_DETAIL: orderId,
        CREATED_BY: userId
    }, { transaction });
};

exports.getAccountByUser = async (userId) => {
    return await AccountDetail.findOne({ where: { ID_USER_LOGIN_DETAIL: userId } });
};
