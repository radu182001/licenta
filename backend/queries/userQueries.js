const getAllUsers = "SELECT * FROM Users";

const getUserByEmail = (email) =>
  `SELECT * FROM Users WHERE email = '${email}'`;

const getUserByUsername = (username) =>
  `SELECT * FROM Users WHERE username = '${username}'`;

const addUser = (email, username, password, firstname, lastname) =>
  `INSERT INTO Users (email, username, password, firstname, lastname) VALUES ('${email}', '${username}', '${password}', '${firstname}', '${lastname}') RETURNING id`;

const getFullName = (id) =>
  `SELECT firstname, lastname FROM Users WHERE id = '${id}'`;

const getUsername = (id) => `SELECT username FROM Users WHERE id = '${id}'`;

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserByUsername,
  addUser,
  getFullName,
  getUsername,
};
