// src/lib/socket.js
import { io } from "socket.io-client";

// Replace with your backend URL
const SOCKET_URL = "http://localhost:5000";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;
