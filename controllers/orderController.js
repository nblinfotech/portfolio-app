const { placeOrder } = require('../services/orderService');

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user?.id || 1; // mock user for now
        const result = await placeOrder(req.body, userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
