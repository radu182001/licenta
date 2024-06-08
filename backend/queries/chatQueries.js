const createConv = (name) =>
  `INSERT INTO Conversations (name) VALUES ('${name}') RETURNING id`;

const createConvNewProject = (name, id) =>
  `INSERT INTO Conversations (name, projectid) VALUES ('${name}', ${id}) RETURNING id`;

const addParticipant = (userID, conversationID) =>
  `INSERT INTO Participants (UserID, ConversationID) VALUES ('${userID}', '${conversationID}')`;

const addMessage = (userID, conversationID, text) => `
  WITH inserted AS (
    INSERT INTO Messages (senderid, conversationid, content)
    VALUES ('${userID}', '${conversationID}', '${text}')
    RETURNING *
  )
  SELECT inserted.*, users.username
  FROM inserted
  JOIN users ON inserted.senderid = users.id;
`;
const getMessages = (conversationID) =>
  `SELECT m.*, u.username, u.firstname, u.lastname FROM Messages m, Users u WHERE m.senderid=u.id AND conversationid=${conversationID} ORDER BY m.timestamp`;

const getChatId = (projectId) =>
  `SELECT id FROM Conversations WHERE projectid=${projectId}`;

module.exports = {
  createConv,
  addParticipant,
  createConvNewProject,
  addMessage,
  getMessages,
  getChatId,
};
