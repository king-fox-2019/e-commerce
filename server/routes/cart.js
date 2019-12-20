'use strict'

const express = require('express')
const router = express.Router()
const { Cart } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.put('/delete', Cart.deleteCart)
router.put('/add', Cart.addCart)
router.get('/', Cart.readCart)
router.put('/', Cart.checkout)

module.exports = router