const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email is wrong")  
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
         throw HttpError(401, "Password is wrong")  
    }

    res.json({
        token: "<TOKEN>",
        user: {
            email,
            subscription: "starter"
        }
    })
}

module.exports = login;