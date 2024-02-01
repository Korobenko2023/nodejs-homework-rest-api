const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = require("../config");
const { User } = require("../models/user");


const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError (401, "Not authorized"))
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
            next(HttpError (401, "Not authorized"))
        }
        reg.user = user;
        next();
        
    } catch {
        next(HttpError (401, "Not authorized"))        
    }
}

module.exports = authenticate;