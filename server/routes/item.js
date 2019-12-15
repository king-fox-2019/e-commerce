const express = require('express')
const Item = express.Router()
const ItemCon = require('../controllers/ItemCon')

//find all
Item.get('/',ItemCon.findAll)

//find one
Item.get('/:id',ItemCon.findOne)

//create
Item.post('/', ItemCon.create)

//delete one
Item.delete('/:id', ItemCon.remove)

//update
Item.put('/:id',ItemCon.update)

module.exports = Item