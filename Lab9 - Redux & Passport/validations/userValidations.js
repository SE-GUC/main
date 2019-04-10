const Joi = require('joi')

module.exports = {
    registerValidation: request => {
        const registerSchema = {
            name: Joi.string().min(2).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            age: Joi.number()
        }

        return Joi.validate(request, registerSchema)
    },

    loginValidation: request => {
        const loginSchema = {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
        return Joi.validate(request, loginSchema)
    }
}