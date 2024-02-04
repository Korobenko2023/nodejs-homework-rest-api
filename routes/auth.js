const express = require('express');
const { validateBody, authenticate, isValidId } = require("../middlewares");
const { authSchema, updateSubscriptionSchema } = require("../schemas/userSchemas");
const { register, login, getCurrent, logout, updateStatusSubscription } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.post("/login", validateBody(authSchema), login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, getCurrent);
authRouter.patch("/subscription/:id", authenticate, isValidId, validateBody(updateSubscriptionSchema), updateStatusSubscription);

module.exports = authRouter;