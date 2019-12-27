const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')

if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log(`Connected to database`)
  })
  .catch((err) => {
    console.log(err)
  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(routes)

app.use(errorHandler)

module.exports = app