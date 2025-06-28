const {
    placeOrder,
    getOrdersByUser,
    getOrderByRef,
    updateOrderStatusById
} = require('../services/orderService');

const { successResponse, errorResponse } = require('../utils/responseUtil');

// POST /api/order
exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user?.id || 1;
        const result = await placeOrder(req.body, userId);
        return successResponse(res, result, 201);
    } catch (err) {
        return errorResponse(res, err, err.statusCode || 500);
    }
};

// GET /api/orders
exports.getOrders = async (req, res) => {
    try {
        const userId = req.user?.id || 1;
        const orders = await getOrdersByUser(userId);
        return successResponse(res, orders);
    } catch (err) {
        return errorResponse(res, err);
    }
};

// GET /api/order/:ref
exports.getOrderByRef = async (req, res) => {
    try {
        const userId = req.user?.id || 1;
        const order = await getOrderByRef(req.params.ref, userId);
        if (!order) return errorResponse(res, new Error('Order not found'), 404);
        return successResponse(res, order);
    } catch (err) {
        return errorResponse(res, err);
    }
};

// PUT /api/order/:id
exports.updateOrderById = async (req, res) => {
    try {
        const userId = req.user?.id || 1;
        const orderId = req.params.id;
        const result = await updateOrderStatusById(orderId, req.body.status, userId);
        return successResponse(res, result);
    } catch (err) {
        return errorResponse(res, err, err.statusCode || 500);
    }
};
