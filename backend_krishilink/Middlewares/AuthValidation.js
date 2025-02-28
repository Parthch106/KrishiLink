const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(100).required(),
        lastName: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^\d{10}$/).required().messages({
            "string.pattern.base": "Phone number must be 10 digits."
        }),
        address: Joi.string().min(5).max(255).required(),
        farmSize: Joi.number().min(0.1).required().messages({
            "number.min": "Farm size must be at least 0.1 acres."
        }),
        experience: Joi.number().min(0).max(100).required().messages({
            "number.min": "Experience must be a positive number.",
            "number.max": "Experience cannot exceed 100 years."
        }),
        password: Joi.string().min(6).max(100).required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            error
        });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(err => err.message)
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
