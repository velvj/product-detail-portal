const joi = require("joi");


const productValidation = joi.object({
    productID: joi.number().required(),
    productName: joi.string().required(),
    brand: joi.string().required(),
    model: joi.number().required(),
    category: joi.string().required(),
    price: joi.number().required(),
    date: joi.string().required(),
    color: joi.string().required(),
    qty: joi.number().required(),
})

module.exports = {
    productValidation
}