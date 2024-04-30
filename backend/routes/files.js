const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorization");
const upload = require("../middleware/fileUpload");

const filesController = require("../controllers/filesController");

router.post(
  "/uploadFile/:projectID",
  authorize,
  upload.uploadFile.single("file"),
  filesController.uploadFile
);

router.post(
  "/uploadProfile",
  authorize,
  upload.uploadProfilePicture.single("file")
);

router.get("/getFilesList/:id", authorize, filesController.getProjectFilesList);

router.get("/profile", authorize, filesController.getProfilePicture);

router.get("/:userID/:projectID/:file", authorize, filesController.getFile);

router.delete(
  "/:userID/:projectID/:file",
  authorize,
  filesController.deleteFile
);

module.exports = router;
