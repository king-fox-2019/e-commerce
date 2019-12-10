const express = require('express')
const router = express.Router()
const User = require('./userRouter')
const Product = require('./productRouter')
const Cart = require('./cartRouter')
const Transaction = require('./transactionRouter')

router.use('/users', User)
router.use('/products', Product)
router.use('/carts', Cart)
router.use('/transactions', Transaction)

module.exports = router