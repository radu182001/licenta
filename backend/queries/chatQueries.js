const createConv = (name) =>
  `INSERT INTO Conversations (name) VALUES ('${name}') RETURNING id`;

const addParticipant = (userID, conversationID) =>
  `INSERT INTO Participants (UserID, ConversationID) VALUES ('${userID}', '${conversationID}')`;

module.exports = {
  createConv,
  addParticipant,
};
