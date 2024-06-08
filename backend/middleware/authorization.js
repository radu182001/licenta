const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payload;
    next();
  } catch (ex) {
    res.status(400).send({ msg: "Invalid token." });
  }
}

module.exports = auth;
