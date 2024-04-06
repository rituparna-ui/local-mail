const express = require("express");

const { signup, login } = require("../controllers/auth");
const { signupValidation, loginValidation } = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", signupValidation(), signup);

router.post("/login", loginValidation(), login);

module.exports = router;
