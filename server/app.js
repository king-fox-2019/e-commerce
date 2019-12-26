if(process.env.NODE_ENV==='development')
  {
      require('dotenv').config()
  }
require('./config/mongoose')


const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(cors())
app.use(morgan())


app.use(require('./routers'))
app.use(require('./middlewares/errorHandler'))


module.exports = app