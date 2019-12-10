const items = require('express').Router()
const { ItemController } = require('../controllers')

items.get('/', ItemController.getAllItems)

module.exports = items
