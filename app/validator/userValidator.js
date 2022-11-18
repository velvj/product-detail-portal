const Joi = require("joi");

const userValidation = Joi.object({
    name: Joi.string().required().min(3),
    phone: Joi.number().required().min(1000000000).max(9999999999).error(new Error('Please enter a valid phone number')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required().error(new Error('Please enter a valid Email ID')),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().error(new Error('Please enter a valid password'))

})
const loginValidation = Joi.object({
    username: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

module.exports = {
    userValidation, loginValidation
}