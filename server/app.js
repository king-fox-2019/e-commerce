if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const express = require('express'),
  app = express(),
  cors = require('cors'),
  router = require('./routes'),
  errorHandler = require('./middlewares/errorHandler')

require('./config/mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(errorHandler)

module.exports = app
