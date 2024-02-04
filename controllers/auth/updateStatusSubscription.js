const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const updateStatusSubscription = async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedUser) {
        throw HttpError(404);
    }
    res.json(updatedUser);
}

module.exports = updateStatusSubscription;




// const updateStatusSubscription = async (req, res) => {
//     const { subscription } = req.body;
//     const { userId } = req.params;
//     const validSubscriptions = ["starter", "pro", "business"];
//      if (!validSubscriptions.includes(subscription)) {
//         throw HttpError(400, "Invalid subscription value");
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, { subscription }, { new: true });

//     if (!updatedUser) {
//        throw HttpError(404);
//     }

//     res.json( updatedUser );
// }



