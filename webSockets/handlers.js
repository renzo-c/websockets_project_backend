const { db } = require("../routes/fakeDatabase");
const { typesDef } = require("../utils/constants");
const { v4: uuidv4 } = require("uuid");
const { WebSocket } = require("ws");

const { ws } = require("./resources");

const broadcast = (packet) => {
  const connections = ws.getConnections();
  Object.keys(connections).forEach((userId) => {
    const connection = connections[userId];
    if (connection.readyState === WebSocket.OPEN) {
      connection.send(JSON.stringify(packet));
    }
  });
};

/**
 * Handles the message sent by the user based on the message type
 * It is a public room, then every action is broadcasted
 *
 * @param {Buffer} bytes The message content in bytes
 * @param {String} userId The user unique identifier
 */
const handleMessage = (bytes, userId) => {
  const dataFromClient = JSON.parse(bytes.toString());
  console.log(`UserId ${userId} sent: ${JSON.stringify(dataFromClient)}`);

  // Creating response
  let packet = { type: dataFromClient.type };
  switch (dataFromClient.type) {
    case typesDef.USER_CONNECT: {
      packet.data = { clients: ws.getClients() };
      break;
    }
    case typesDef.MESSAGE_SENT: {
      const { message, username } = dataFromClient;
      const messageId = uuidv4();
      const newMessage = {
        messageId,
        message,
        username,
        createdAt: new Date().getTime(),
      };
      packet.data = newMessage;
      db.addMessage(newMessage);
      break;
    }
    case typesDef.MESSAGE_DELETE: {
      const { messageId } = dataFromClient;
      db.removeMessage(messageId);
      const messages = db.getMessages();
      packet.data = messages;
      break;
    }
  }
  console.log(`Backend sends: ${JSON.stringify(packet)}`);
  broadcast(packet);
};

const handleDisconnect = (userId) => {
  console.log(`${userId} disconnected.`);
  ws.deleteConnection(userId);
  ws.deleteClient(userId);

  const clients = ws.getClients();
  const packet = { type: typesDef.USER_DISCONNECT };
  packet.data = { clients };

  broadcast(packet);
};

module.exports = { handleMessage, handleDisconnect };
