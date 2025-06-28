const { OrderDetail, AccountDetail, SecurityDetail, AuditAction, sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.placeOrder = async (data, userId) => {
    const { fundName, transactionType, quantity } = data;

    const security = await SecurityDetail.findOne({ where: { SECURITY_NAME: fundName } });
    if (!security) throw new Error('Invalid Security Name');

    const orderValue = quantity * security.VALUE;

    const account = await AccountDetail.findOne({ where: { ID_USER_LOGIN_DETAIL: userId } });
    if (!account) throw new Error('Account not found');

    if (transactionType === 'Buy' && account.RUNNING_BALANCE < orderValue) {
        throw new Error('Insufficient Balance');
    }

    const newBalance = transactionType === 'Buy'
        ? account.RUNNING_BALANCE - orderValue
        : account.RUNNING_BALANCE + orderValue;

    const orderRef = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;

    const t = await sequelize.transaction();
    try {
        const order = await OrderDetail.create({
            ID_SECURITY_DETAIL: security.ID,
            ORDER_REF_NO: orderRef,
            ORDER_STATUS: 'Submitted',
            TRANSACTION_TYPE: transactionType,
            ORDER_VALUE: orderValue,
            CREATED_BY: userId
        }, { transaction: t });

        await AccountDetail.create({
            ID_USER_LOGIN_DETAIL: userId,
            CREDIT: transactionType === 'Sell' ? orderValue : 0,
            DEBIT: transactionType === 'Buy' ? orderValue : 0,
            RUNNING_BALANCE: newBalance,
            ID_ORDER_DETAIL: order.ID,
            CREATED_BY: userId
        }, { transaction: t });

        await AuditAction.create({
            ID_USER_LOGIN_DETAIL: userId,
            USER_ACTION: `Order Placed: ${transactionType}`,
            START_DATE_TIME: new Date(),
            END_DATE_TIME: new Date()
        }, { transaction: t });

        await t.commit();

        return {
            message: 'Order Submitted',
            orderRef,
            orderValue,
            status: 'Submitted'
        };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};
