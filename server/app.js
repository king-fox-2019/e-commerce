"use strict";

require("dotenv").config();

let mongoURI;

if (process.env.NODE_ENV === "development") {
  mongoURI = process.env.MONGO_URI_DEV;
} else if (process.env.NODE_ENV === "test") {
  mongoURI = process.env.MONGO_URI_TEST;
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(_ => console.log("connected to database."))
  .catch(_ => console.log("database connection failed."));

app.use(morgan("dev"));
app.use("/", routes);

app.use((req, res, next) => {
  const err = {
    msg: "Not Found.",
    status: 404
  };
  next(err);
});

app.use(errorHandler);

module.exports = app;
