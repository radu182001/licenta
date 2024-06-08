const socketIo = require("socket.io");

let io;

function initialize(server) {
  io = socketIo(server, {
    cors: {
      origin: ["http://localhost:4200"], // Adjust this to your frontend's URL
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    // Listen for typing signals
    socket.on("typing", (data) => {
      console.log(`typing/${data.chatId}`);
      socket.broadcast.emit(`typing/${data.chatId}`, { userId: data.userId });
    });
  });
}

function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = {
  initialize,
  getIo,
};
