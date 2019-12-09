if (process.env.NODE_ENV === 'developlent' || process.env.NODE_ENV === 'test')
  require('dotenv').config()

const express = require('express')
const app = express()

require('./config/mongoose')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes'))
app.use(require('./middlewares/errorHandler'))

module.exports = app
