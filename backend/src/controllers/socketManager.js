import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-call", (roomPath) => {
      if (!connections[roomPath]) {
        connections[roomPath] = [];
      }
      connections[roomPath].push(socket.id);
      timeOnline[socket.id] = new Date();

      // Notify others in the room
      connections[roomPath].forEach((socketId) => {
        io.to(socketId).emit("user-joined", socket.id, connections[roomPath]);
      });

      // Send previous messages to the newly joined user
      if (messages[roomPath]) {
        messages[roomPath].forEach((msg) => {
          io.to(socket.id).emit("chat-messages", msg.data, msg.sender, msg["socket-id-sender"]);
        });
      }
    });

    socket.on("signal", (targetId, message) => {
      io.to(targetId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, socketList]) => {
          if (!isFound && socketList.includes(socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false]
      );

      if (found) {
        if (!messages[matchingRoom]) {
          messages[matchingRoom] = [];
        }

        const newMessage = {
          sender: sender,
          data: data,
          "socket-id-sender": socket.id
        };

        messages[matchingRoom].push(newMessage);

        connections[matchingRoom].forEach((id) => {
          io.to(id).emit("chat-messages", data, sender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      const disconnectTime = new Date();
      const connectedTime = timeOnline[socket.id] || disconnectTime;
      const diffTime = Math.abs(disconnectTime - connectedTime);
      console.log(`User ${socket.id} disconnected after ${diffTime}ms`);

      for (const [roomKey, socketList] of Object.entries(connections)) {
        const index = socketList.indexOf(socket.id);
        if (index !== -1) {
          socketList.splice(index, 1);

          // Notify others in the room
          socketList.forEach((id) => {
            io.to(id).emit("user-left", socket.id);
          });

          if (socketList.length === 0) {
            delete connections[roomKey];
            delete messages[roomKey];
          }

          break; // Done processing
        }
      }

      delete timeOnline[socket.id];
    });
  });
};

export default connectToSocket;
