const express = require("express");
const { db } = require("./fakeDatabase");

const router = express.Router();

router.post("/api/message", async (req, res) => {
  const { username, message } = req.body;
  const newMessage = { username, message, createdAt: new Date().getTime() };
  db.addMessage(newMessage);
  res.status(201).send(db.getMessages());
});

module.exports = { createMessageRouter: router };
