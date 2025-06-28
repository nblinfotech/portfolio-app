const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/order', orderController.placeOrder); //Place Order
router.get('/orders', orderController.getOrders); //Get All Orders
router.get('/order/:ref', orderController.getOrderByRef); //Get Order by Ref
router.put('/order/:id', orderController.updateOrderById); //Update

module.exports = router;
