require('dotenv').config();
require('./bin/mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/", router);

module.exports = app;
