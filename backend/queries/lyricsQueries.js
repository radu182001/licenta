const createLyricsPage = (id, content) =>
  `INSERT INTO Lyrics (ProjectID, Content) VALUES (${id}, '${content}')`;

const updateLyricsPage = (id, content) =>
  `UPDATE Lyrics SET Content = '${content}' WHERE ProjectID = ${id}`;

const getLyrics = (id) => `SELECT Content FROM Lyrics WHERE ProjectID = ${id}`;

module.exports = {
  createLyricsPage,
  updateLyricsPage,
  getLyrics,
};
