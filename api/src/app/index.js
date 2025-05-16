import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import WebSocket from "ws";
import url from "url";
import http from "http";

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const ws_connections = [];

const messages = [];

let lastClientId = 0;

wss.on("connection", (ws, req) => {
  const clientId = lastClientId++;
  console.log("New client connected. Client ID:", clientId);

  ws_connections.push(ws);

  ws.send(
    JSON.stringify({
      type: "init",
      clientId: clientId,
      messages: messages,
    })
  );

  ws.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message);
    } catch (error) {
      console.error("Error parsing message:", error);
      ws.send(JSON.stringify({ error: "Invalid message format, it should be JSON." }));
      return;
    }

    parsedMessage.clientId = clientId;
    parsedMessage.timestamp = new Date().toISOString();
    parsedMessage.type = "message";
    messages.push(parsedMessage);

    for (const conn of ws_connections) {
      if (conn.readyState === WebSocket.OPEN) {
        conn.send(JSON.stringify(parsedMessage));
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected.");
    const index = ws_connections.indexOf(ws);
    if (index !== -1) {
      ws_connections.splice(index, 1);
    }
  });
});

app.get("/history", (req, res) => {
  res.status(200).json(messages);
});

app.get("/", (req, res) => res.status(200).send("200 OK"));

app.get("/-/health", (req, res) => res.status(200).send("200 OK"));

server.listen(PORT, function listening() {
  console.log("Listening on %d", server.address().port);
});
