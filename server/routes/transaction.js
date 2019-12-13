const router = require('express').Router()
const { authenticate, authorizationCustomer, authorizationAdmin } = require('../middlewares/auth')
const TransactionController = require('../controllers/transaction')

// get all transaction
router.get('/', authenticate, authorizationAdmin, TransactionController.getAllTransaction)

// get all user transaction
router.get('/user', authenticate, authorizationCustomer, TransactionController.getUserTransaction)

// create transaction
router.post('/', authenticate, authorizationCustomer, TransactionController.createTransaction)

// update status sent
router.put('/:id/sent', authenticate, authorizationAdmin, TransactionController.sentProduct)

// update status receive
router.put('/:id/received', authenticate, authorizationCustomer, TransactionController.receivedProduct)

module.exports = router