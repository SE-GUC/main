const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            title: Joi.string().min(3).max(500).required(),
            author: Joi.string().min(3).max(100).required(),
            numberOfPages: Joi.number().min(50).max(3000).required(),
            releaseYear: Joi.string()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            title: Joi.string().min(3).max(500),
            author: Joi.string().min(3).max(100),
            numberOfPages: Joi.number().min(50).max(3000),
            releaseYear: Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }, 
}