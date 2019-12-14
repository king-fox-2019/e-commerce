'use strict'

const express = require('express')
const router = express.Router()
const { Cart } = require('../controllers')

router.post('/', Cart.create)
router.get('/', Cart.read)
router.put('/', Cart.update)
router.delete('/', Cart.delete)

module.exports = router