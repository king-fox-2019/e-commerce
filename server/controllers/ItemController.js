const { Item } = require('../models')
const createError = require('http-errors')
class ItemController {
  static getAllItems(req, res, next) {
    Item.find()
      .then(items => {
        res.status(200).json({ data: items })
      })
      .catch(next)
  }

  static getOneItem(req, res, next) {
    Item.findById(req.params.id)
      .then(item => {
        if (item) res.status(200).json({ data: item })
        else throw createError(404, 'Item not found')
      })
      .catch(next)
  }

  static createNewItem(req, res, next) {
    const { name, image, price, stock } = req.body
    Item.create({
      name,
      image,
      price,
      stock
    })
      .then(item => {
        res.status(200).json({ message: 'Item created', data: item })
      })
      .catch(next)
  }

  static updateItem(req, res, next) {
    const { name, image, price, stock } = req.body
    Item.findByIdAndUpdate(
      req.params.id,
      { name, image, price, stock },
      { new: true, omitUndefined: true }
    ).then(item => {
      res.status(200).json({ message: 'Item updated', data: item })
    })
  }

  static deleteItem(req, res, next) {
    Item.findByIdAndDelete(req.params.id)
      .then(item => {
        if (item) res.status(200).json({ message: 'Item deleted' })
        else throw createError(404, 'Item not found')
      })
      .catch(next)
  }
}
module.exports = ItemController
