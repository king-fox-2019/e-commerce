const transactions = require('express').Router()
const { TransactionController } = require('../controllers')
const { authorizeTransaction } = require('../middlewares/auth')

transactions.use('/:id', authorizeTransaction)
transactions.patch('/:id', TransactionController.updateTransactionStatus)

module.exports = transactions
