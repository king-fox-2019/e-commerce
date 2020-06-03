'use strict'

const express = require('express')
const router = express.Router()
const { Product } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.post('/', Product.create)
router.get('/', Product.read)
router.get('/eb', Product.readEB)
router.get('/sb', Product.readSB)
router.use(authentication)
router.get('/:id', Product.readOne)
router.put('/:id', Product.update)
router.delete('/:id', Product.delete)

module.exports = router