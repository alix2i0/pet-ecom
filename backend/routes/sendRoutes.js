const express = require("express");
const router = express.Router();

const sendController = require("../controllers/sendController");

router.post("/", sendController.sendEmail);

module.exports = router;
