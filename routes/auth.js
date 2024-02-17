const express = require('express');
const { validateBody, authenticate, isValidId, upload } = require("../middlewares");
const { authSchema, updateSubscriptionSchema, loginSchema, emailSchema } = require("../schemas/userSchemas");
const { register, login, getCurrent, logout, updateStatusSubscription, updateAvatar, verifyEmail, resendVerifyEmail } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, getCurrent);
authRouter.patch("/subscription/:id", authenticate, isValidId, validateBody(updateSubscriptionSchema), updateStatusSubscription);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = authRouter;