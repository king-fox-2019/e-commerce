const router = require('express').Router()
const CartController = require('../controllers/cartCon')
const { authentication, authCustomer, authAdmin, authorization} = require('../middlewares/auth')
const TransactionController = require('../controllers/transaction')

router.get('/', authAdmin, CartController.showAll)
router.post('/transaction', authCustomer, TransactionController.create)
router.get('/transaction', TransactionController.showAllUser)
router.get('/transaction/admin', authAdmin, TransactionController.showAllAdmin)
router.put('/transaction/:transactionId', authCustomer, TransactionController.confirm)
router.get('/user', CartController.showAllUserCart)
router.get('/city', CartController.apiCity)
router.get('/ongkir/:cityCode', CartController.ongkir)
router.get('/user/history', CartController.showAllHistoryUserCart)
router.get('/user/pending', CartController.showAllPendingUserCart)
router.put('/confirm/:id', authCustomer, authorization, CartController.finishing) //cartId
router.post('/:id', authCustomer, CartController.create) //itemId
router.put('/:id', authCustomer, authorization, CartController.update) //cartId
router.delete('/:id', authCustomer, authorization, CartController.delete) //cartId

module.exports = router
