require("dotenv").config();

const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const http = require("http");
const socket = require("./utils/socketIO");
const socketIo = require("socket.io");

const users = require("./routes/users");
const auth = require("./routes/auth");
const projects = require("./routes/projects");
const chat = require("./routes/chat");
const files = require("./routes/files");
const lyrics = require("./routes/lyrics");

//console.log(process.env);

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
if (!config.get("s3_accessKeyId")) {
  console.error("FATAL ERROR: s3_accessKeyId is not defined.");
  process.exit(1);
}
if (!config.get("s3_secretAccessKey")) {
  console.error("FATAL ERROR: s3_secretAccessKey is not defined.");
  process.exit(1);
}
if (!config.get("inviteToken")) {
  console.error("FATAL ERROR: inviteToken is not defined.");
  process.exit(1);
}
if (!config.get("db_host")) {
  console.error("FATAL ERROR: db_host is not defined.");
  process.exit(1);
}
if (!config.get("db_password")) {
  console.error("FATAL ERROR: db_password is not defined.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/projects", projects);
app.use("/api/chat", chat);
app.use("/api/files", files);
app.use("/api/lyrics", lyrics);

// Create HTTP server
const server = http.createServer(app);

// open socket
socket.initialize(server);

const port = 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
