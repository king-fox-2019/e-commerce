const user = require('./userRoute')
const product = require('./product')
const transaction = require('./transaction')
const router = require('express').Router()

router.use('/user',user)
router.use('/product',product)
router.use('/transaction',transaction)

module.exports = router