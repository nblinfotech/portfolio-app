const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const orderValidator = require('../validators/orderValidator');

router.post('/order', (req, res, next) => {
    const { error } = orderValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
}, orderController.placeOrder);

module.exports = router;
