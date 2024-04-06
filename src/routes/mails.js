const express = require("express");
const { getMails } = require("../controllers/mails");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", verifyToken(), getMails);

module.exports = router;
