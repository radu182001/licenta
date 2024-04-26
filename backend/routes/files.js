const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorization");
const upload = require("../middleware/fileUpload");

const filesController = require("../controllers/filesController");

router.post(
  "/uploadFile",
  authorize,
  upload.uploadFile.single("file"),
  filesController.uploadFile
);

router.post(
  "/uploadProfile",
  authorize,
  upload.uploadProfilePicture.single("file"),
  filesController.uploadFile
);

router.get("/profile", authorize, filesController.getProfilePicture);

router.get("/file", authorize, filesController.getFile);

module.exports = router;
