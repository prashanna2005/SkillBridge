// server/index.js
const express = require("express");
const http = require("http");
const multer = require("multer");
const cors = require("cors");
const { Server } = require("socket.io");
const admin = require("firebase-admin"); // optional, or use aws-sdk for S3

const serviceAccount = require("./firebase-service-account.json"); // if using Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET
});
const bucket = admin.storage().bucket();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// simple room & socket mapping
const rooms = {};

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("create-or-join", ({ roomId, userId }) => {
    socket.join(roomId);
    // broadcast to others in room that someone joined
    socket.to(roomId).emit("user-joined", { socketId: socket.id, userId });
  });

  socket.on("offer", (payload) => {
    const { targetSocket } = payload;
    if (targetSocket) io.to(targetSocket).emit("offer", { ...payload, fromSocket: socket.id });
  });

  socket.on("answer", (payload) => {
    const { targetSocket } = payload;
    if (targetSocket) io.to(targetSocket).emit("answer", { ...payload });
  });

  socket.on("ice-candidate", ({ roomId, candidate }) => {
    // broadcast ICE to all in room except the sender
    socket.to(roomId).emit("ice-candidate", { candidate });
  });

  socket.on("leave-room", ({ roomId }) => {
    socket.leave(roomId);
    socket.to(roomId).emit("user-left", { socketId: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("disconnect", socket.id);
  });
});

// Multer memory storage to then push to Firebase Storage
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/upload-voice", upload.single("voice"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file" });

    const filename = `voice-messages/${Date.now()}_${file.originalname}`;
    const fileRef = bucket.file(filename);
    const stream = fileRef.createWriteStream({
      metadata: { contentType: file.mimetype },
    });

    stream.on("error", (err) => {
      console.error("Upload error", err);
      res.status(500).send({ error: "upload error" });
    });

    stream.on("finish", async () => {
      // Make public (or generate signed url)
      await fileRef.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      res.json({ url: publicUrl, filename });
    });

    stream.end(file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log("Server running on", PORT));
