const pool = require("../database/db");
const queries = require("../queries/userQueries");
const bcrypt = require("bcrypt");
const validate = require("../utils/validation");
const jwt = require("jsonwebtoken");
const config = require("config");

const authController = async (req, res) => {
  const { username, password } = req.body;
  // check if body values are valid
  const { error } = validate.validateAuth(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  try {
    // check if user exists
    const user = await pool.query(queries.getUserByUsername(username));
    if (!user.rows.length)
      return res.status(400).send({ error: "Invalid username or password" });
    // check if password matches
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword)
      return res.status(400).send({ error: "Invalid username or password." });

    const token = jwt.sign(
      {
        id: user.rows[0].id,
      },
      config.get("jwtPrivateKey")
    );

    res.status(200).send({ token: token });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const validateToken = async (req, res) => {
  try {
    const payload = jwt.verify(req.body.token, config.get("jwtPrivateKey"));
    res.status(200).send({ msg: "Valid token." });
  } catch (ex) {
    res.status(400).send({ error: "Invalid token." });
  }
};

module.exports = { authController, validateToken };
