const express = require('express');
const { getAllContacts, getOneContact, deleteContact, createContact, updateContact, updateStatusContact } = require("../controllers/contact/contactsControllers");
const { validateBody, isValidId, authenticate } = require("../middlewares");
const { createContactSchema, updateContactSchema, updateStatusContactSchema } = require("../schemas/contactSchemas");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);

contactsRouter.post("/", authenticate, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", authenticate,  isValidId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/favorite/:id", authenticate, isValidId, validateBody(updateStatusContactSchema), updateStatusContact);

module.exports = contactsRouter;
