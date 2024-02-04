const Contact = require("../../models/contactsSchemas");
const { HttpError, controllerWrapper } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite ? { favorite: favorite === 'true'  } : {};
  const allContacts = await Contact.find({ owner, ...filter }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email");
 
  res.json(allContacts)
};

const getOneContact = async (req, res) => { 
  const { id } = req.params;
  const contactById = await Contact.findById(id);
  if (!contactById) {
    throw HttpError(404);
  }
  res.json(contactById) 
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(id)
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
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
   if (!updatedContact) {
      throw HttpError(404);
  }   
  res.json(updatedContact)
};
 
const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
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

