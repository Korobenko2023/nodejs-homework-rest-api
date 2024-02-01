const { controllerWrapper } = require("../../helpers");
const register = require("./register");
const login = require("./login");

module.exports = {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
}