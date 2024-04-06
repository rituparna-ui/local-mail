const express = require("express");

const { signup } = require("../controllers/auth");
const { signupValidation } = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", signupValidation(), signup);

module.exports = router;
