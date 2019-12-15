const express = require('express')
const cart = express.Router()
const { cartController } = require('../controllers')
const { authentication, authorization } = require('../middlewares');

cart.use(authentication)
cart.get('/', cartController.showCart)
cart.post('/', cartController.addCart)
cart.delete('/:productId', cartController.deleteItem)



module.exports = cart