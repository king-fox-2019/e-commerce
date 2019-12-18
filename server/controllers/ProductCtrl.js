const Product = require('../models/Product')

class ProductCtrl {
  
  static getAll(req, res, next) {
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }
  
  static getOne(req, res, next) {
    Product.findById(req.params.id)
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }
  
  static create(req, res, next) {
    const {name, image, price, stock} = req.body
    const userId = req.decodedId
    Product.create({
      name,
      image,
      price,
      stock,
      userId
    })
    .then(products => {
      res.status(201).json({products, message: 'Product successfully created'})
    })
    .catch(next)
  }
  
  // static updateImage(req, res, next) {

  // }
  
  static update(req, res, next) {
    const {name, image, price, stock} = req.body
    const id = req.params.id
    Product.findByIdAndUpdate(
    {_id: id},
    {
      name,
      image,
      price,
      stock
    })
    .then(products => {
      res.status(200).json({products, message: 'Product successfully updated'})
    })
    .catch(next)
  }
  
  static delete(req, res, next) {
    const id = req.params.id
    Product.findOneAndDelete({_id:id})
      .then(product => {
        res.status(200).json({product, message: 'Product succesfully deleted'})
      })
      .catch(next)
  }
  
}

module.exports = ProductCtrl