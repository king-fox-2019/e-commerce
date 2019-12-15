if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.connect('mongodb://localhost:27017/eshop', {useNewUrlParser: true});
const User = require('./routes/user')
const Product = require('./routes/product')
const Transaction = require('./routes/transaction')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/user', User)
app.use('/product', Product)
app.use('/transaction', Transaction)
app.use(errorHandler)

module.exports = app