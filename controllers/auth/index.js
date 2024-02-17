const { controllerWrapper } = require("../../helpers");
const register = require("./register");
const login = require("./login");
const getCurrent = require("./current");
const logout = require("./logout");
const updateStatusSubscription = require("./updateStatusSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
    getCurrent: controllerWrapper(getCurrent),
    logout: controllerWrapper(logout),
    updateStatusSubscription: controllerWrapper(updateStatusSubscription),
    updateAvatar: controllerWrapper(updateAvatar),
    verifyEmail: controllerWrapper(verifyEmail),
    resendVerifyEmail: controllerWrapper(resendVerifyEmail),
}