const { Schema, model } = require('mongoose');
const Joi = require("joi");

const contactSchema = new Schema(
    {
        name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
        }, 
     owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },

    }, { versionKey: false, timestamps: true });

const createContactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, })
        .required(),    
    phone: Joi.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required(),
});

const updateContactSchema = Joi.object({
    name: Joi.string()
        .min(3),
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    phone: Joi.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
}).min(1).messages({ "object.min": "Body must have at least one field" });

const updateStatusContactSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
    createContactSchema,
    updateContactSchema,
    updateStatusContactSchema,
    Contact,
}

