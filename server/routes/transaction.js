const routes = require('express').Router()
const TransactionController = require('../controllers/transaction')
const {authenticate} = require('../middlewares/auth')
routes.get('/', TransactionController.getAllTransaction)
routes.use(authenticate)
routes.post('/', TransactionController.addTransaction)
routes.patch('/:id', TransactionController.changeStatus)
routes.delete('/:id', TransactionController.deleteTransaction)
routes.get('/user', TransactionController.getUserTransaction)

module.exports = routes