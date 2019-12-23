if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "testing"
) {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connection = require("./config/connection");
const routes = require("./routes");
const morgan = require("morgan");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
//connection to Mongoose DB
connection();
//set depedencies
app.use(cors());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
//middleware route
app.use("/", routes);
app.use(errorHandler);

module.exports = app;
