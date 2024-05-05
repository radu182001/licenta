const pool = require("../database/db");
const queries = require("../queries/projectQueries");
const validate = require("../utils/validation");
const string = require("../utils/string");

const roles = require("../utils/roles");

const createProject = async (req, res) => {
  let { name, description } = req.body;

  name = string.escapeSqlString(name);
  description = string.escapeSqlString(description);
  console.log(name);

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

    res.status(201).send({
      id: id.rows[0].id,
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const addNewMember = async (req, res) => {
  const { projectID, role } = req.body;

  // validate body
  const { error } = validate.validateAddMember(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  try {
    // check if project exists

    // check if user is already in the project
    const userRole = await pool.query(
      queries.getUserRole(req.user.id, projectID)
    );
    if (userRole.rows.length)
      return res
        .status(400)
        .send({ msg: "You are already enrolled in this project!" });

    // add the user to the project
    await pool.query(queries.addUserToProject(req.user.id, projectID, role));

    res.status(201).send(`Added to the project as ${role}`);
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

module.exports = {
  createProject,
  addNewMember,
  getProjects,
  getProject,
};
