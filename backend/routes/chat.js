const express = require("express");
const router = express.Router();

const authorize = require("../middleware/authorization");

const chatController = require("../controllers/chatController");

router.post(
  "/createConversation",
  authorize,
  chatController.createConversation
);

module.exports = router;
