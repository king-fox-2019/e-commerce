const router = require('express').Router()
const routeProducts = require('./routeProducts')
const routeUsers = require('./routeUsers')
const routeCarts = require('./routeCarts')
const routeTransactions = require('./routeTransactions')

router.use('/products', routeProducts)
router.use('/users', routeUsers)
router.use('/carts', routeCarts)
router.use('/transactions', routeTransactions)

module.exports = router