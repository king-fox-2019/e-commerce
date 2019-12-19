'use strict'
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'testing' ) require('dotenv').config();

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const monggose = require('mongoose')
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

monggose.connect('mongodb://localhost/ecomerce', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
  if (err) console.log('database is an error')
  else console.log('data base is an active')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)
app.use(errorHandler)

module.exports = app