const { Contact } = require("../../models/contactsSchemas");
const { HttpError, controllerWrapper } = require("../../helpers");

const getAllContacts = async (req, res) => {
   const { _id: owner } = req.user;
   const allContacts = await Contact.find({owner}, "-createdAt -updatedAt");
   res.json(allContacts)
};

const getOneContact = async (req, res) => { 
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw HttpError(404);
  }
  res.json(contactById) 
};

const deleteContact = async (req, res) => {
  const { contactId  } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(contactId)
    if (!deleteContact) {
      throw HttpError(404);
    }
  res.json(deleteContact) 
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({...req.body, owner});    
    res.status(201).json(newContact)    
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
   if (!updatedContact) {
      throw HttpError(404);
  }   
  res.json(updatedContact)
};
 
const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
   if (!updatedContact) {
      throw HttpError(404);
  }   
  res.json(updatedContact)
 };

module.exports = {
    getAllContacts: controllerWrapper(getAllContacts),
    getOneContact: controllerWrapper(getOneContact),
    deleteContact: controllerWrapper(deleteContact),
    createContact: controllerWrapper(createContact),
    updateContact: controllerWrapper(updateContact),
    updateStatusContact: controllerWrapper(updateStatusContact)
}

