const express = require('express')
const route = express.Router()
const user = require('./user')
const item = require('./item')
const cart = require('./cart')


route.use('/users',user)
route.use('/items',item)
route.use('/carts',cart)



module.exports = route