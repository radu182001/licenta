const pool = require("../database/db");
const queries = require("../queries/chatQueries");
const validate = require("../utils/validation");
const socket = require("../utils/socketIO");

const createConversation = async (req, res) => {
  // validate body
  const { error } = validate.validateAddConv(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    // create conversation
    const convID = await pool.query(queries.createConv(req.body.name));
    // add current user to conversation
    await pool.query(queries.addParticipant(req.user.id, convID.rows[0].id));

    res.status(201).send({ conversationID: convID.rows[0].id });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getMessages = async (req, res) => {
  try {
    const msg = await pool.query(
      queries.getMessages(req.params.conversationId)
    );

    res.status(200).send({ messages: msg.rows });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const addMessage = async (req, res) => {
  try {
    const result = await pool.query(
      queries.addMessage(req.user.id, req.params.conversationId, req.body.text)
    );

    socket
      .getIo()
      .emit(`newMessage/${req.params.conversationId}`, result.rows[0]);

    res.status(201).send({ msg: result.rows[0] });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getChatId = async (req, res) => {
  try {
    const id = await pool.query(queries.getChatId(req.params.projectId));
    res.status(200).send({ id: id.rows[0].id });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

module.exports = {
  createConversation,
  getMessages,
  addMessage,
  getChatId,
};
