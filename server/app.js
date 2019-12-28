if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === 'testing'){
    require('dotenv').config()
}

require('./config/connection')
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middlewares/errorHandler')

// middlewares
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan('dev'))

// routes
app.use(routes)

// errorHandler
app.use(errorHandler)


module.exports = app