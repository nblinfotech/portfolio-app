const Joi = require('joi');

const orderSchema = Joi.object({
    fundName: Joi.string().required(),
    transactionType: Joi.string().valid('Buy', 'Sell').required(),
    quantity: Joi.number().greater(0).required()
});

module.exports = orderSchema;
