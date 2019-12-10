const user = require('express').Router()
const { UserController, CartController } = require('../controllers')

user.get('/checksession', UserController.checkSession)
user.get('/cart', CartController.getUserCart)
user.patch('/cart', CartController.updateUserCart)

module.exports = user
