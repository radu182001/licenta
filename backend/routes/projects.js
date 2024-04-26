const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorization");

const projectsController = require("../controllers/projectsController");

router.post("/", authorize, projectsController.createProject);

router.post("/addUserToProject", authorize, projectsController.addNewMember);

router.get("/", authorize, projectsController.getProjects);

module.exports = router;
