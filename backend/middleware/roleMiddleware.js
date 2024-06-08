const pool = require("../database/db");
const queries = require("../queries/projectQueries");
const roles = require("../utils/roles");

async function admin(req, res, next) {
  try {
    const userRole = await pool.query(
      queries.getUserRole(req.user.id, req.params.projectId)
    );

    if (userRole.rows[0].role === roles.admin) {
      next();
    } else {
      return res.status(400).send({ msg: "Only admins have access!" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

async function manager(req, res, next) {
  try {
    const userRole = await pool.query(
      queries.getUserRole(req.user.id, req.params.projectId)
    );

    if (
      userRole.rows[0].role === roles.admin ||
      userRole.rows[0].role === roles.manager
    ) {
      next();
    } else {
      return res
        .status(400)
        .send({ msg: "Only admins and managers have access!" });
    }
  } catch (error) {
    res.status(500).send({ error: "role error" });
  }
}

async function member(req, res, next) {
  try {
    console.log("1");
    console.log(req.user.id, req.params.projectId);
    const userRole = await pool.query(
      queries.getUserRole(req.user.id, req.params.projectId)
    );
    console.log("2");
    if (
      userRole.rows[0].role === roles.admin ||
      userRole.rows[0].role === roles.manager ||
      userRole.rows[0].role === roles.member
    ) {
      next();
    } else {
      return res
        .status(400)
        .send({ msg: "Only users in this project have access!" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

module.exports = { admin, member, manager };
