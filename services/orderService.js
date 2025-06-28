const { OrderDetail, SecurityDetail, sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { updateAccountBalance, getAccountByUser } = require('./accountService');
const { logAuditAction } = require('./auditService');

exports.placeOrder = async (data, userId) => {
    const { fundName, transactionType, quantity } = data;

    const security = await SecurityDetail.findOne({ where: { SECURITY_NAME: fundName } });
    if (!security) throw new Error('Invalid Security Name');

    const orderValue = quantity * security.VALUE;

    const account = await getAccountByUser(userId);
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

        await updateAccountBalance({
            userId,
            orderId: order.ID,
            transactionType,
            orderValue,
            newBalance,
            transaction: t
        });

        await logAuditAction(userId, `Order Placed: ${transactionType}`, t);

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

exports.getOrdersByUser = async (userId) => {
    return await OrderDetail.findAll({
        where: { CREATED_BY: userId },
        order: [['ID', 'DESC']]
    });
};

exports.getOrderByRef = async (orderRef, userId) => {
    return await OrderDetail.findOne({
        where: { ORDER_REF_NO: orderRef, CREATED_BY: userId }
    });
};


exports.updateOrderStatusById = async (orderId, newStatus, userId) => {
    const validStatuses = ['Submitted', 'Cancelled', 'Executed', 'Completed', 'Failed'];

    if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid Order Status');
    }

    const order = await OrderDetail.findOne({
        where: { ID: orderId, CREATED_BY: userId }
    });

    if (!order) throw new Error('Order not found');
    if (order.ORDER_STATUS === newStatus) {
        throw new Error('Order already in the specified status');
    }

    const t = await sequelize.transaction();
    try {
        await order.update({ ORDER_STATUS: newStatus }, { transaction: t });

        await logAuditAction(userId, `Order Status Updated to ${newStatus}`, t);

        await t.commit();

        return {
            message: 'Order status updated',
            orderId: order.ID,
            newStatus
        };
    } catch (err) {
        await t.rollback();
        throw err;
    }
};
