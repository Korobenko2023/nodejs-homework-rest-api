const express = require('express');
const { validateBody, authenticate, isValidId, upload } = require("../middlewares");
const { authSchema, updateSubscriptionSchema } = require("../schemas/userSchemas");
const { register, login, getCurrent, logout, updateStatusSubscription, updateAvatar, verifyEmail } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post("/login", validateBody(authSchema), login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, getCurrent);
authRouter.patch("/subscription/:id", authenticate, isValidId, validateBody(updateSubscriptionSchema), updateStatusSubscription);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = authRouter;