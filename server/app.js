const express = require('express')
const mongoose = require('mongoose')
const app = express()
const route = require('./routes')
const errorHandler = require('./midllewares/errorHandler')
const cors = require('cors')

require ('dotenv').config()

mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true, useUnifiedTopology:true})
.then(()=>{
    console.log('db connected !!')
})
.catch(err=>{
    console.log(err)
})

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/',route)

app.use(errorHandler)


module.exports = app

