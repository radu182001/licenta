const express = require("express");
const router = express.Router();

const authorize = require("../middleware/authorization");
const roleMiddleware = require("../middleware/roleMiddleware");

const lyricsController = require("../controllers/lyricsController");

router.get("/suggestions", lyricsController.getSuggestions);

router.get("/rhymes", authorize, lyricsController.getRhymes);

router.get("/similarWords", authorize, lyricsController.getSimilarWords);

router.get(
  "/:projectId",
  authorize,
  roleMiddleware.member,
  lyricsController.getLyrics
);

router.put(
  "/:projectId",
  authorize,
  roleMiddleware.manager,
  lyricsController.updateLyricsPage
);

module.exports = router;
