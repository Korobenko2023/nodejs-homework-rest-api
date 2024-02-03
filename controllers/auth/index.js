const { controllerWrapper } = require("../../helpers");
const register = require("./register");
const login = require("./login");
const getCurrent = require("./current");
const logout = require("./logout");

module.exports = {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
    getCurrent: controllerWrapper(getCurrent),
    logout: controllerWrapper(logout),
}