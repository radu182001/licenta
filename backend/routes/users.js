const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorization");

const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

router.post("/", userController.register);

router.get("/getFullName", authorize, userController.getFullName);

router.get("/getUsername", authorize, userController.getUsername);

module.exports = router;
