const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("./model/user-model");
const Chat = require("./model/chat-model");

// Define the verifyToken function
function verifyToken(token) {
  try {
    if (token && token.startsWith("Bearer")) {token = token.slice(7, token.length);}
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    return decoded;
  } catch (error) {
    return false;
  }
}

module.exports = {
  initializeChat: (server) => {
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
      methods: ["GET", "POST"],
      pingTimeout: 5 * 60 * 1000,
      pingInterval: 600000,
      maxHttpBufferSize: 1e8, // 100 MB
    });

    io.on("connection", async (socket) => {
      const token = socket.handshake.headers.authorization;
      if (verifyToken(token)) {
        console.log("A user Connected");

        socket.on("getUsers", async (data) => {
          const users = await User.find({ _id: { $ne: data._id } });
          socket.emit("getUsers", users);
        });

        socket.on("sendMessage", async (data) => {
          const newChat = new Chat({
            from: data.from,
            to: data.to,
            message: data.message,
          });
          const newData = await newChat.save();
          io.local.emit("sendMessage", newData);
        });

        socket.on("getMessage", async (data) => {
          const allChat = await Chat.find({
            $or: [
              { from: data.from, to: data.to },
              { from: data.to, to: data.from },
            ],
          });
          io.local.emit("getMessage", allChat);
        });
      } else {
        console.log("Invalid token. Disconnecting...");
        socket.disconnect();
      }
    });
  },
};
