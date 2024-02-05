const User = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateStatusSubscription = async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedUser) {
        throw HttpError(404);
    }
    res.json(updatedUser);
}

module.exports = updateStatusSubscription;