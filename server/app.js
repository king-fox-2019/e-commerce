require('dotenv').config();
require('./bin/mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers');
const {errHandler} = require('./middleware/errorHandler')

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/", router);
app.use(errHandler);

module.exports = app;
