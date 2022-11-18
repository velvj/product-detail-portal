const Joi = require('joi')

//valiidate coupons 
const couponsValidation = Joi.object({
    offerName: Joi.string().required().min(3),
    couponCode: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,14}$')).required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    type: Joi.string().required().valid("discount%", "amount"),
    value: Joi.number().required(),
    couponStatus: Joi.boolean()
})

module.exports = { couponsValidation }