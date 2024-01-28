const mongoose = require('mongoose');
const HttpError = require("./HttpError");

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!mongoose.isValidObjectId(contactId)) {
        return next(HttpError(404, `${contactId} is not a valid id`));
    }
    next();
};

module.exports = isValidId;