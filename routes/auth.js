const express = require('express');
const { validateBody } = require("../helpers/index");
const { authSchema } = require("../models/user");
const { register, login } = require("../controllers/auth/index");

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.post("/login", validateBody(authSchema), login);
module.exports = authRouter;