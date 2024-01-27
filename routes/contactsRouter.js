const express = require('express');
const { getAllContacts, getOneContact, deleteContact, createContact, updateContact, updateStatusContact } = require("../controllers/contactsControllers");
const { validateBody, isValidId } = require("../helpers");
const { createContactSchema, updateContactSchema, updateStatusContactSchema } = require("../services/contactsSchemas");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get('/:contactId', isValidId, getOneContact);

contactsRouter.delete('/:contactId', isValidId, deleteContact);

contactsRouter.post('/', validateBody(createContactSchema), createContact);

contactsRouter.put('/:contactId', isValidId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch('/favorite/:contactId', isValidId, validateBody(updateStatusContactSchema), updateStatusContact);

module.exports = contactsRouter;
