const express = require('express')
const Cart = express.Router()
const CartCon = require('../controllers/CartCon')
const { authenticate, authorize }  = require('../midllewares/auth')

Cart.use(authenticate)

//find all
Cart.get('/',CartCon.findAll)

//find one
Cart.get('/:id',CartCon.findOne)

//create
Cart.post('/', CartCon.create)

//delete one
Cart.delete('/:id', CartCon.remove)

//update
Cart.put('/:id',CartCon.update)

module.exports = Cart