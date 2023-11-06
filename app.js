const express = require("express");
const bodyParser = require("body-parser");

const { indexMessageRouter } = require("./routes");
const { createMessageRouter } = require("./routes/new");
const { deleteMessageRouter } = require("./routes/delete");
const cors = require("cors");

var jsonParser = bodyParser.json();

const app = express();

app.use(jsonParser);
app.use(cors());

// routes
app.use(indexMessageRouter);
app.use(createMessageRouter);
app.use(deleteMessageRouter);

app.all("*", async () => {
  throw new Error("Route Not Found");
});

module.exports = app;
