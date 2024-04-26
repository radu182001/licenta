const pool = require("../database/db");
const queries = require("../queries/chatQueries");
const validate = require("../utils/validation");

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
    return res.status(500).send(error);
  }
};

module.exports = {
  createConversation,
};
