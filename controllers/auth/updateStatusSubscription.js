const User = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateStatusSubscription = async (req, res) => {
    const { id } = req.params;
    const { subscription } = req.body;
    const validSubscriptions = ["starter", "pro", "business"];
     if (!validSubscriptions.includes(subscription)) {
        throw HttpError(400, "Invalid subscription value");
    }
    const updatedUser = await User.findByIdAndUpdate(id, { subscription }, {new: true});
        if (!updatedUser) {
        throw HttpError(404);
    }
    res.json(updatedUser);
}

module.exports = updateStatusSubscription;