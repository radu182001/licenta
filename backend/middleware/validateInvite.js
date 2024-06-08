const jwt = require("jsonwebtoken");
const config = require("config");

function inviteToken(req, res, next) {
  const token = req.params.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const payload = jwt.verify(token, config.get("inviteToken"));
    const currentTime = new Date();
    const expiresAt = new Date(payload.expiresAt);

    if (currentTime > expiresAt) {
      return res.status(401).send("Token expired!");
    }

    req.token = payload;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = inviteToken;
