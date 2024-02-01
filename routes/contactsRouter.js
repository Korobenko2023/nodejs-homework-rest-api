const express = require('express');
const { getAllContacts, getOneContact, deleteContact, createContact, updateContact, updateStatusContact } = require("../controllers/contact/contactsControllers");
const { validateBody, isValidId, authenticate } = require("../middlewares");
const { createContactSchema, updateContactSchema, updateStatusContactSchema } = require("../models/contactsSchemas");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get('/:contactId', authenticate, isValidId, getOneContact);

contactsRouter.delete('/:contactId', authenticate, isValidId, deleteContact);

contactsRouter.post('/', authenticate, validateBody(createContactSchema), createContact);

contactsRouter.put('/:contactId', authenticate,  isValidId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch('/favorite/:contactId', authenticate, isValidId, validateBody(updateStatusContactSchema), updateStatusContact);

module.exports = contactsRouter;
