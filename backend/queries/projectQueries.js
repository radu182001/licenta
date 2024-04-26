const getProjectByName = (userID, name) =>
  `SELECT id, name FROM Projects WHERE OwnerId = ${userID} and name = '${name}'`;

const createProject = (userID, name, description) => {
  if (description)
    return `INSERT INTO Projects (name, description, ownerid) VALUES ('${name}', '${description}', '${userID}') RETURNING id`;
  else
    return `INSERT INTO Projects (name, ownerid) VALUES ('${name}', '${userID}') RETURNING id`;
};

const addUserToProject = (userID, projectID, role) =>
  `INSERT INTO UserProjects (userid, projectid, role) VALUES ('${userID}', '${projectID}', '${role}')`;

const getUserRole = (userID, projectID) =>
  `SELECT role FROM UserProjects WHERE UserID = ${userID} AND ProjectID = ${projectID}`;

const getProjects = (userID) =>
  `SELECT id, name FROM Projects WHERE OwnerID = '${userID}'`;

module.exports = {
  getProjectByName,
  createProject,
  addUserToProject,
  getUserRole,
  getProjects,
};
