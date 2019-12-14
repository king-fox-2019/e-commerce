const user = require('express').Router()
const {
  UserController,
  CartController,
  TransactionController
} = require('../controllers')

user.get('/checksession', UserController.checkSession)
user.get('/cart', CartController.getUserCart)
user.patch('/cart', CartController.updateUserCart)
user.post('/transactions', TransactionController.createTransaction)
user.get('/transactions', TransactionController.getAllUserTransactions)

module.exports = user
