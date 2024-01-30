const { Schema, model } = require('mongoose');
const Joi = require("joi");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    password: {
        type: String,        
        required: [true, 'Set password for user'],   
        minlength: 6,
    },    
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegex,
        unique: true,
    },    
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: String,
}, { versionKey: false, timestamps: true });
    
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
        .required(),
});

const User = model("user", userSchema);

modelNames.exports = {
    authSchema,
    updateSubscriptionSchema,
    User,
};