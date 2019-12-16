if(process.env.NODE_ENV==='development'){
    require('dotenv').config()
}

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const { errorHandler } = require('./middlewares/errorHandler')
const app = express()
const index = require('./routes/index')
mongoose.connect('mongodb+srv://richard:richard123@cluster0-rahmf.gcp.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',index)
app.use(errorHandler)

module.exports = app