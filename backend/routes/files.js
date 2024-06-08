const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorization");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/fileUpload");

const filesController = require("../controllers/filesController");

router.post(
  "/uploadFile/:projectId",
  authorize,
  roleMiddleware.manager,
  upload.uploadFile.single("file"),
  filesController.uploadFile
);

router.post(
  "/uploadProfile",
  authorize,
  upload.uploadProfilePicture.single("file")
);

router.get(
  "/getFilesList/:projectId",
  authorize,
  roleMiddleware.member,
  filesController.getProjectFilesList
);

router.get(
  "/getAudioFilesList/:projectId",
  authorize,
  roleMiddleware.member,
  filesController.getProjectAudioFilesList
);

router.get(
  "/getArrangeFiles/:projectId",
  authorize,
  roleMiddleware.member,
  filesController.getArrangeFiles
);

router.post(
  "/addToArrangeFile/:projectId",
  authorize,
  roleMiddleware.manager,
  filesController.addToArrangeFile
);

router.get(
  "/getDawAudios/:projectId",
  authorize,
  roleMiddleware.member,
  filesController.getDawAudios
);

router.post(
  "/addToDawAudio/:projectId",
  authorize,
  roleMiddleware.manager,
  filesController.addToDawAudio
);

router.delete(
  "/deleteDawAudio/:projectId/:id",
  authorize,
  roleMiddleware.manager,
  filesController.delDawAudio
);

router.put(
  "/updateDawAudio/:projectId/:id",
  authorize,
  roleMiddleware.manager,
  filesController.updateDawAudio
);

router.get("/profile", authorize, filesController.getProfilePicture);

router.get(
  "/:userID/:projectId/:file",
  authorize,
  roleMiddleware.member,
  filesController.getFile
);

router.delete(
  "/:userID/:projectId/:file",
  authorize,
  roleMiddleware.manager,
  filesController.deleteFile
);

module.exports = router;
