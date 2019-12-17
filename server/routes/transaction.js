const router = require('express').Router()
const TransactionController = require('../controllers/transaction')
const { authentication, transactionAuth, authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', TransactionController.getTransaction)
router.get('/admin', authorization, TransactionController.adminFindAll)
router.get('/admin/:user_id', authorization, TransactionController.adminFind)
router.post('/', TransactionController.createTransaction)
router.patch('/:id', authentication, transactionAuth, TransactionController.transactionDone)

module.exports = router