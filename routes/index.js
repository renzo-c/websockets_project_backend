const express = require("express");
const { db } = require("./fakeDatabase");

const router = express.Router();
router.get("/api/messages", async (req, res) => {
  const messages = db.getMessages();
  res.status(201).send(messages);
});

module.exports = { indexMessageRouter: router };
