if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const {errorHandler} = require('./middlewares');
const routes = require('./routes');

mongoose
  .connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('connected to db'))
  .catch(console.log);

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', routes);
app.use(errorHandler);

module.exports = app;
