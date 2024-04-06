const express = require("express");
const router = express.Router();

const authRouter = require("./routes/auth");
const mailsRouter = require("./routes/mails");

router.use("/auth", authRouter);

router.use("/mails", mailsRouter);

module.exports = router;
