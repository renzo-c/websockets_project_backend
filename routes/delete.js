const express = require("express");
const { db } = require("./fakeDatabase");

const router = express.Router();

router.delete("/api/message/:messageId", async (req, res) => {
  const { messageId } = req.params;
  db.removeMessage(messageId);
  const updatedMessages = db.getMessages();
  res.status(201).send(updatedMessages);
});

module.exports = { deleteMessageRouter: router };
