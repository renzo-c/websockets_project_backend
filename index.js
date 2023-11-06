const app = require("./app");
const http = require("http");
const startupWebSockets = require("./webSockets");

require("dotenv").config();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const startupServer = async () => {
  server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT} ! 💻`);
  });
};

startupServer();
startupWebSockets(server);
