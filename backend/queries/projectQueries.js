const string = require("../utils/string");

const getProjectByName = (userID, name) =>
  `SELECT id, name FROM Projects WHERE OwnerId = ${userID} and name = '${name}'`;

const getProject = (projectID, userID) =>
  `SELECT p.*, up.Role 
  FROM Projects p
  JOIN UserProjects up ON p.ID = up.ProjectID
  WHERE p.ID = ${projectID} AND up.UserID = ${userID}`;

const createProject = (userID, name, description) => {
  if (description) {
    return `INSERT INTO Projects (name, description, ownerid) VALUES ('${name}', '${description}', '${userID}') RETURNING id`;
  } else
    return `INSERT INTO Projects (name, ownerid) VALUES ('${name}', '${userID}') RETURNING id`;
};

const addUserToProject = (userID, projectID, role) =>
  `INSERT INTO UserProjects (userid, projectid, role) VALUES ('${userID}', '${projectID}', '${role}')`;

const getUserRole = (userID, projectID) =>
  `SELECT role FROM UserProjects WHERE UserID = ${userID} AND ProjectID = ${projectID}`;

const getProjects = (userID) =>
  `SELECT p.id, p.name FROM Projects p, UserProjects up  WHERE up.UserID = '${userID}' AND p.ID = up.ProjectID`;

const getUsersInProject = (id) =>
  `SELECT u.id, u.username, up.role FROM Users u, UserProjects up WHERE up.ProjectID=${id} AND up.UserID=u.ID`;

const getStats = (userId) =>
  `SELECT role, count(*) from userprojects where userid=${userId} group by role`;

module.exports = {
  getProjectByName,
  createProject,
  addUserToProject,
  getUserRole,
  getProjects,
  getProject,
  getUsersInProject,
  getStats,
};
