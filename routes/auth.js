const express = require('express');
const { validateBody } = require("../middlewares");
const { authSchema } = require("../models/user");
const { register, login } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.post("/login", validateBody(authSchema), login);
module.exports = authRouter;