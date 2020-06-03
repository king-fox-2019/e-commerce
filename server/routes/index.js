'use strict'

const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const productRouter = require('./item')
const cartRouter = require('./cart')

router.use('/users', userRouter)
router.use('/items', productRouter)
router.use('/cart', cartRouter)

module.exports = router