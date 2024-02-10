const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");

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

    const payload = {
    id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    
    res.json({
        token,
        user: {
             email: user.email,
            subscription: user.subscription,
        }
    })
}

module.exports = login;