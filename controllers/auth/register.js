const User = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = require("../../config");

const register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

     if (user) {
          throw HttpError(409, "Email in use")
    }
    
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);  
  const verificationToken = nanoid();
  
  const userNew = await User.create({ email, password: hashedPassword, avatarURL, verificationToken })
  
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

      res.status(201).json({
        user: {
          email: userNew.email,
          subscription: userNew.subscription,
        }
})  
}

module.exports = register;