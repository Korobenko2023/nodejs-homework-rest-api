const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index");
const bcrypt = require("bcrypt");


const register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

     if (user) {
          throw HttpError(409, "Email in use")
    }
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const userNew = await User.create({ email, password: hashedPassword })
      res.status(201).json({
          user: {
              email,
              subscription: "starter"
            }
})  
}

module.exports = register;