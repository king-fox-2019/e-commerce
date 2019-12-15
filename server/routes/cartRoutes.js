const express = require('express')
const cart = express.Router()
const { cartController } = require('../controllers')
const { authentication, authorization } = require('../middlewares');

cart.use(authentication)
cart.post('/', cartController.addCart)
cart.get('/',cartController.showCart)
cart.delete('/:cartId', authorization ,cartController.deleteItem)



module.exports = cart