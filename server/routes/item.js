'use strict'

const express = require('express')
const router = express.Router()
const { Product } = require('../controllers')

router.post('/', Product.create)
router.get('/', Product.read)
router.get('/:id', Product.readOne)
router.put('/:id', Product.update)
router.delete('/:id', Product.delete)

module.exports = router