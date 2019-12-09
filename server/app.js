if (process.env.NODE_ENV === 'developlent' || process.env.NODE_ENV === 'test')
  require('dotenv').config()

const express = require('express')
const app = express()

require('./config/mongoose')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

module.exports = app
