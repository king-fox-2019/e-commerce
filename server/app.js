if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const morgan = require('morgan')
const cors = require('cors')

require('./config/mongoose')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', routes)
app.use(errorHandler)

module.exports = app