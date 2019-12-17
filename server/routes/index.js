const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const transaction = require('./transaction')


router.use('/user', user)
router.use('/products', product)
router.use('/transactions', transaction)


module.exports = router
