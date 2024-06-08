const pool = require("../database/db");
const queries = require("../queries/projectQueries");
const validate = require("../utils/validation");
const string = require("../utils/string");
const lyrQueries = require("../queries/lyricsQueries");
const chatQueries = require("../queries/chatQueries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const roles = require("../utils/roles");
const filesController = require("./filesController");

const createProject = async (req, res) => {
  let { name, description } = req.body;

  name = string.escapeSqlString(name);
  description = string.escapeSqlString(description);

  // validate body
  const { error } = validate.validateProject(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  try {
    // check if the owner already has a project with the same name
    const existingProject = await pool.query(
      queries.getProjectByName(req.user.id, name)
    );
    if (existingProject.rows.length)
      return res.status(400).send("Project with same name already exists!");
    // insert data into the table
    const id = await pool.query(
      queries.createProject(req.user.id, name, description)
    );

    // add user-project association to the UserProjects table
    await pool.query(
      queries.addUserToProject(req.user.id, id.rows[0].id, roles.admin)
    );

    // add lyrics page
    await pool.query(lyrQueries.createLyricsPage(id.rows[0].id, ""));

    // create conversation
    const convID = await pool.query(
      chatQueries.createConvNewProject(name, id.rows[0].id)
    );
    // add current user to conversation
    await pool.query(
      chatQueries.addParticipant(req.user.id, convID.rows[0].id)
    );

    res.status(201).send({
      id: id.rows[0].id,
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getToken = async (req, res) => {
  try {
    const token = jwt.sign(
      {
        projectId: req.params.projectId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      config.get("inviteToken")
    );

    res.status(200).send({ token: token });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const addNewMember = async (req, res) => {
  try {
    // Check if user is already in the project
    const userRoleQuery = queries.getUserRole(req.user.id, req.token.projectId);
    const userRole = await pool.query(userRoleQuery);

    if (userRole.rows.length > 0) {
      return res
        .status(400)
        .send({ msg: "You are already enrolled in this project!" });
    }

    // Add the user to the project
    const addUserQuery = queries.addUserToProject(
      req.user.id,
      req.token.projectId,
      "member"
    );
    await pool.query(addUserQuery);

    res.status(201).send({ msg: `Added to the project as member` });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await pool.query(queries.getProjects(req.user.id));

    res.status(200).send({ body: projects.rows });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await pool.query(
      queries.getProject(req.params.id, req.user.id)
    );

    res.status(200).send({ body: project.rows[0] });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getUsersInProject = async (req, res) => {
  try {
    const users = await pool.query(
      queries.getUsersInProject(req.params.projectId)
    );

    // Get profile picture for all users
    for (const user of users.rows) {
      image = await filesController.getProfileImageGeneral(user.id);

      user.image = image;
    }

    res.status(200).send({ users: users.rows });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const getProjectStats = async (req, res) => {
  try {
    const data = await pool.query(queries.getStats(req.user.id));

    let stats = {};

    stats.admin =
      data.rows[data.rows.findIndex((row) => row.role === roles.admin)];
    stats.manager =
      data.rows[data.rows.findIndex((row) => row.role === roles.manager)];
    stats.member =
      data.rows[data.rows.findIndex((row) => row.role === roles.member)];

    res.status(200).send({ body: stats });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const getRole = async (req, res) => {
  try {
    const role = await pool.query(
      queries.getUserRole(req.user.id, req.params.projectId)
    );

    res.status(200).send({ role: role.rows[0].role });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProject,
  addNewMember,
  getProjects,
  getProject,
  getToken,
  getUsersInProject,
  getProjectStats,
  getRole,
};
