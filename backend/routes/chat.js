const express = require("express");
const router = express.Router();

const authorize = require("../middleware/authorization");
const roleMiddleware = require("../middleware/roleMiddleware");

const chatController = require("../controllers/chatController");

router.get(
  "/chatId/:projectId",
  authorize,
  roleMiddleware.member,
  chatController.getChatId
);

router.post(
  "/createConversation",
  authorize,
  chatController.createConversation
);

router.get(
  "/:projectId/:conversationId",
  authorize,
  roleMiddleware.member,
  chatController.getMessages
);

router.post(
  "/:projectId/:conversationId",
  authorize,
  roleMiddleware.member,
  chatController.addMessage
);

module.exports = router;
