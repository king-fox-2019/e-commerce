const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const router = require('./routes')
const {errorHandler} = require('./middlewares/errorHandler')

require('dotenv').config()
require('./config/mongoose')

app.use('/', router)

app.get((req, res, next)=>{
    const err = {
        msg: 'Not Found.',
        status: 404
    }
    next(err)
})

app.use(errorHandler)

module.exports = app