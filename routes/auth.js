const express = require('express');
const { validateBody, authenticate } = require("../middlewares");
const { authSchema } = require("../models/user");
const { register, login, getCurrent, logout } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.post("/login", validateBody(authSchema), login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, getCurrent);

module.exports = authRouter;