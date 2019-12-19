"use strict";
if ((process.env.NODE_ENV = "development")) require("dotenv").config();

const express = require("express");
const app = express();
const MONGOURI = "mongodb://localhost:27017/ecommerce"
const mongoose = require("mongoose");
const cors = require("cors");
const errHandling = require("./middlewares/errHandling");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(_ => console.log(`Connected to mongoDB ${MONGOURI}`))
  .catch(err =>
    console.log(`Unable to connect to ${MONGOURI}, error=> ${err}`)
  );

const user = require("./routes/user");
const product = require("./routes/product");
const cart = require("./routes/cart");
app.use("/product", product);
app.use("/user", user);
app.use('/cart', cart)
app.use(errHandling);

module.exports = app;
