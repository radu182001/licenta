const express = require("express");
const router = express.Router();

const authorize = require("../middleware/authorization");

const lyricsController = require("../controllers/lyricsController");

router.get("/suggestions", lyricsController.getSuggestions);

router.get("/rhymes", authorize, lyricsController.getRhymes);

router.get("/similarWords", authorize, lyricsController.getSimilarWords);

module.exports = router;
