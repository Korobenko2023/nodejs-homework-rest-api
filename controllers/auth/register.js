const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');

const register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

     if (user) {
          throw HttpError(409, "Email in use")
    }
    
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);  
  
    const userNew = await User.create({ email, password: hashedPassword, avatarURL })
      res.status(201).json({
          user: {
              email: userNew.email,
              subscription: userNew.subscription,
            }
})  
}

module.exports = register;