const items = require('express').Router()
const { ItemController } = require('../controllers')

items.get('/', ItemController.getAllItems)
items.get('/:id', ItemController.getOneItem)

module.exports = items
