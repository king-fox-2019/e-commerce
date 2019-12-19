if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "testing"
) {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

connectToDb();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routes);

app.use(errorHandler);

module.exports = app;
