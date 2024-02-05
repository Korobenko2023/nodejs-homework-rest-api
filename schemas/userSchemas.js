const Joi = require("joi");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const authSchema = Joi.object({
    password: Joi.string()
        .required()
        .min(6),    
    email: Joi.string()
        .pattern(emailRegex)
        .required(),  
    subscription: Joi.string(),  
    token: Joi.string(),  
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid("starter", "pro", "business") 
        .required()
        .messages({
            "any.required": "missing field subscription",
            "any.only": "Invalid subscription value",
        }),
});

module.exports = {
    authSchema,
    updateSubscriptionSchema,
};