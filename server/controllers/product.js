const Product = require('../models/product')

class ProductController {
  static all(req, res, next) {
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }
  static create(req, res, next) {
    let { name, price, image, stock } = req.body
    Product.create({ name, price, image, stock })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    let { id } = req.params.id
    Product.deleteOne({ id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ProductController