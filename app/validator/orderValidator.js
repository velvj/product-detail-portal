const Joi = require('joi')

const orderValidation = Joi.object({
    customer: Joi.string().required(),
    orderItems: Joi.array().required(),
    shippingAddress: Joi.object(),
    couponID: Joi.string().required(),
    date: Joi.string().required(),
    cancelOrder: Joi.boolean().required()

})
module.exports = { orderValidation }