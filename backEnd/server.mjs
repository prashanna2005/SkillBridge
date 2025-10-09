// server.js (backend)
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined ${roomId}`);
  });

  socket.on("offer", (data) => {
    socket.to(data.roomId).emit("offer", data.sdp);
  });

  socket.on("answer", (data) => {
    socket.to(data.roomId).emit("answer", data.sdp);
  });

  socket.on("candidate", (data) => {
    socket.to(data.roomId).emit("candidate", data.candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("Signaling server running on port 5000"));
