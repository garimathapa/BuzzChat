import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// WebSocket setup
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const wss = new WebSocketServer({ server });

// wss.on("connection", (ws) => {
//   console.log("New client connected");

//   ws.on("message", (message) => {
//     console.log(`Received: ${message}`);
//     wss.clients.forEach(client => {
//       if (client.readyState === ws.OPEN) {
//         client.send(message.toString());
//       }
//     });
//   });

//   ws.on("close", () => console.log("Client disconnected"));
// });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const parsed = JSON.parse(message.toString());
    
    if (parsed.type === "typing") {
      wss.clients.forEach(client => client.send(JSON.stringify({ type: "typing" })));
    } else {
      wss.clients.forEach(client => client.send(JSON.stringify(parsed)));
    }
  });
});

