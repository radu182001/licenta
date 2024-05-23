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

const getDawAudio = (
  projectID
) => `SELECT audios.trackindex, json_agg(audios.*) as audios FROM (SELECT daw.trackindex, daw.id, f.key as path, daw.X, daw.starttime, daw.endtime
FROM File f, DawAudio daw WHERE daw.fileid
=f.id AND daw.projectid='${projectID}') AS audios GROUP BY audios.trackindex`;

const addToDawAudio = (projectID, fileID, X, track) =>
  `INSERT INTO DawAudio (ProjectID, FileID, X, StartTime, EndTime, TrackIndex) VALUES ('${projectID}','${fileID}', '${X}', 0, 0, '${track}') RETURNING id`;

const deleteDawAudio = (id) => `DELETE FROM DawAudio WHERE id='${id}'`;

const updateDawAudio = (id, x, startTime, endTime) => {
  let query = "UPDATE DawAudio SET";

  const changes = [];

  if (x !== undefined) changes.push(` X = ${x}`);
  if (startTime !== undefined) changes.push(` StartTime = ${startTime}`);
  if (endTime !== undefined) changes.push(` EndTime = ${endTime}`);

  query += changes.join(",");

  query += ` WHERE ID = ${id};`;

  return query;
};

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
  addToDawAudio,
  getDawAudio,
  deleteDawAudio,
  updateDawAudio,
};
