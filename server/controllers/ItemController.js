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
}
module.exports = ItemController
