const uploadFile = (name, size, format, userId, projectID, key) =>
  `INSERT INTO File (Name, Size, Format, UserID, ProjectID, Key) VALUES('${name}', '${size}', '${format}', '${userId}', '${projectID}', '${key}') RETURNING *`;

const getFiles = (id, page, pageSize) =>
  `SELECT f.*, u.username FROM File f, Users u WHERE ProjectID = '${id}' and f.userid = u.id LIMIT ${pageSize} OFFSET ${
    (page - 1) * pageSize
  }`;

const getAudioFiles = (id, page, pageSize) =>
  `SELECT f.*, u.username FROM File f, Users u WHERE ProjectID = '${id}' and f.Format like '%audio%' and f.userid = u.id LIMIT ${pageSize} OFFSET ${
    (page - 1) * pageSize
  }`;

const getArrangeFiles = (id) =>
  `SELECT f.* FROM File f, ArrangeFIle af WHERE af.ProjectID = '${id}' AND f.ID = af.FileID`;

const addToArrangeFile = (projectID, fileID) =>
  `INSERT INTO ArrangeFile (ProjectID, FileID) VALUES('${projectID}', '${fileID}')`;

const totalFiles = (id) => `SELECT COUNT(*) FROM File WHERE ProjectID = ${id}`;

const totalAudioFiles = (id) =>
  `SELECT COUNT(*) FROM File WHERE ProjectID = ${id} and Format like '%audio%'`;

const deleteFile = (key) => `DELETE FROM File WHERE key='${key}'`;

module.exports = {
  uploadFile,
  getFiles,
  getAudioFiles,
  deleteFile,
  totalFiles,
  totalAudioFiles,
  getArrangeFiles,
  addToArrangeFile,
};
