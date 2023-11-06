const { WebSocketServer } = require("ws");
const { handleMessage, handleDisconnect } = require("./handlers");
const url = require("url");
const { v4: uuidv4 } = require("uuid");
const { ws } = require("./resources");

const startupWebSockets = (server) => {
  const wsServer = new WebSocketServer({ server });

  // A new client connection request received
  wsServer.on("connection", (connection, request) => {
    const { username } = url.parse(request.url, true).query;
    const userId = uuidv4();
    // Store data about the new connection
    ws.addConnection(userId, connection);
    ws.addClient(userId, username);
    console.log(`${userId} connected.`);

    // handle connection events
    connection.on("message", (message) => handleMessage(message, userId));
    connection.on("close", () => handleDisconnect(userId));
  });
};

module.exports = startupWebSockets;
