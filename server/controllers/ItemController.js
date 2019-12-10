const { Item } = require('../models')

class ItemController {
  static getAllItems(req, res, next) {
    Item.find()
      .then(items => {
        res.status(200).json({ data: items })
      })
      .catch(next)
  }
}
module.exports = ItemController
