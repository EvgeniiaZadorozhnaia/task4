const router = require("express").Router();

const authRouter = require("./auth.api.router");
const userRouter = require("./user.api.router");
const tokensRouter = require("./tokens.api.router");

router.use("/tokens", tokensRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
