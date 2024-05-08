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

router.get(
  "/getAudioFilesList/:id",
  authorize,
  filesController.getProjectAudioFilesList
);

router.get("/getArrangeFiles/:id", authorize, filesController.getArrangeFiles);

router.post(
  "/addToArrangeFile/:projectID",
  authorize,
  filesController.addToArrangeFile
);

router.get("/getDawAudios/:id", authorize, filesController.getDawAudios);

router.post(
  "/addToDawAudio/:projectID",
  authorize,
  filesController.addToDawAudio
);

router.delete("/deleteDawAudio/:id", authorize, filesController.delDawAudio);

router.get("/profile", authorize, filesController.getProfilePicture);

router.get("/:userID/:projectID/:file", authorize, filesController.getFile);

router.delete(
  "/:userID/:projectID/:file",
  authorize,
  filesController.deleteFile
);

module.exports = router;
