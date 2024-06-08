const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorization");
const invite = require("../middleware/validateInvite");
const roleMiddleware = require("../middleware/roleMiddleware");

const projectsController = require("../controllers/projectsController");

router.post(
  "/invite/:token",
  authorize,
  invite,
  projectsController.addNewMember
);
router.get("/stats", authorize, projectsController.getProjectStats);

router.get("/:id", authorize, projectsController.getProject);

router.get(
  "/inviteToken/:projectId",
  authorize,
  roleMiddleware.admin,
  projectsController.getToken
);

router.get(
  "/users/:projectId",
  authorize,
  projectsController.getUsersInProject
);

router.get("/role/:projectId", authorize, projectsController.getRole);

router.get("/", authorize, projectsController.getProjects);

router.post("/", authorize, projectsController.createProject);

module.exports = router;
