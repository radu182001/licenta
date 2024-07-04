const pool = require("../database/db");
const queries = require("../queries/userQueries");
const bcrypt = require("bcrypt");
const validate = require("../utils/validation");
const jwt = require("jsonwebtoken");
const config = require("config");

const getUsers = async (req, res) => {
  try {
    const users = pool.query(queries.getAllUsers);
    res.status(200).json(users.rows);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const register = async (req, res) => {
  const { email, username, firstname, lastname } = req.body;
  // check if body values are valid
  const { error } = validate.validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // check if user already exists
    try {
      const existingUser = await pool.query(
        queries.getUserByEmail(req.body.email)
      );
      if (existingUser.rows.length)
        return res.status(400).send({ emailErr: "email" });
    } catch (error) {
      res.status(500);
    }

    // check if username is taken
    const existingUsername = await pool.query(
      queries.getUserByUsername(req.body.username)
    );
    if (existingUsername.rows.length)
      return res.status(400).send({ usernameErr: "username" });
    // hash password
    const salt = await bcrypt.genSalt(5);
    const password = await bcrypt.hash(req.body.password, salt);

    console.log(email, password, username, firstname, lastname);
    // create user
    const user = await pool.query(
      queries.addUser(email, username, password, firstname, lastname)
    );

    console.log("created");

    // create jwt token
    const token = jwt.sign(
      {
        id: user.rows[0].id,
      },
      config.get("jwtPrivateKey")
    );

    res
      .status(201)
      .header("x-token", token)
      .send({ msg: "User registered successfully!", token: token });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getFullName = async (req, res) => {
  try {
    const nameData = await pool.query(queries.getFullName(req.user.id));
    res.status(200).send({
      body: `${nameData.rows[0].firstname} ${nameData.rows[0].lastname}`,
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getUsername = async (req, res) => {
  try {
    const username = await pool.query(queries.getUsername(req.user.id));
    res.status(200).send({ body: username.rows[0].username });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

module.exports = {
  getUsers,
  register,
  getFullName,
  getUsername,
};
