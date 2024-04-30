const uploadFile = (name, size, format, userId, projectID, key) =>
  `INSERT INTO File (Name, Size, Format, UserID, ProjectID, Key) VALUES('${name}', '${size}', '${format}', '${userId}', '${projectID}', '${key}') RETURNING *`;

const getFiles = (id) =>
  `SELECT f.*, u.username FROM File f, Users u WHERE ProjectID = '${id}' and f.userid = u.id`;

const deleteFile = (key) => `DELETE FROM File WHERE key='${key}'`;

module.exports = {
  uploadFile,
  getFiles,
  deleteFile,
};
