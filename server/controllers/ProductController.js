const Product = require('../models/product')
const gcsDelete = require('../helpers/gcsDelete')

class ProductController {
  static create(req, res, next) {
    let { name, price, stock, image } = req.body
    if (!name || !price || !stock || !image) {
      res.send(400).json({ message: 'bad request' })
    } else {
      Product.create({ name, price: Number(price), stock, image })
        .then(result => {
          res.status(201).json(result)
        })
        .catch(next)
    }
  }

  static readAll(req, res, next) {
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    let { id } = req.params
    Product.findById(id)
      .then(product => {
        if (product) res.status(200).json(product)
        else next({ status: 404, message: 'product not found' })
      })
      .catch(next)
  }

  static updateField(req, res, next) {
    let { id } = req.params
    let { name, price, stock, image } = req.body
    if(req.file) {
      Product.findById({ _id: id })
        .then(product => {
          gcsDelete(product.image)
          return Product.findByIdAndUpdate({ _id: id }, { $set: { name, price: Number(price), stock, image } }, { runValidators: true, omitUndefined: true, new: true })
        })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(next)
    } else {
      Product.findById({ _id: id })
        .select('image')
        .then(product => {
          return Product.findByIdAndUpdate({ _id: id }, { $set: { name, price: Number(price), stock, image: product.image } }, { runValidators: true, omitUndefined: true, new: true })
        })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(next)
    }
  }

  static deleteProduct(req, res, next) {
    let { id } = req.params
    Product.findById({ _id: id })
      .then(result => {
        if (result) {
          gcsDelete(result.image)
          return Product.deleteOne({ _id: id })
        } else {
          throw ({ status: 404, message: 'Product not found' })
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ProductController