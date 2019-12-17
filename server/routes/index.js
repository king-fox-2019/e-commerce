const router = require('express').Router()
const UserRoutes = require('./user')
const ProductRoutes = require('./product')
const TransactionRoutes = require('./transaction')
const StockRoutes = require('./stock')

router.use('/users', UserRoutes)
router.use('/products', ProductRoutes)
router.use('/transactions', TransactionRoutes)
router.use('/stocks', StockRoutes)

module.exports = router