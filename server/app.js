if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

require('./config/mongoose')

if (process.env.NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes'))
app.use(require('./middlewares/errorHandler'))

module.exports = app
