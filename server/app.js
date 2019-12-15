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

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.get((req, res, next)=>{
    const err = {
        msg: 'Not Found.',
        status: 404
    }
    next(err)
})

app.use(errorHandler)

module.exports = app