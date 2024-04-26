const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/", authController.authController);

router.post("/validateToken", authController.validateToken);

module.exports = router;
