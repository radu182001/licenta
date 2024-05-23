const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");

const users = require("./routes/users");
const auth = require("./routes/auth");
const projects = require("./routes/projects");
const chat = require("./routes/chat");
const files = require("./routes/files");
const lyrics = require("./routes/lyrics");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
if (!config.get("s3_accessKeyId")) {
  console.error("FATAL ERROR: s3_accessKeyId is not defined.");
  process.exit(1);
}
if (!config.get("s3_secretAccessKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
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

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
