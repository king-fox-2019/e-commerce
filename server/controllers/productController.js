const Product = require("../models/product");
const User = require('../models/user')

class ProductController {
  static readAll(req, res, next) {
    Product.find({})
      .then(products => {
        res.status(200).json(products);
      })
      .catch(next);
  }
  static create(req, res, next) {
    let { name, price, stock, description, category } = req.body
    Product.create({
      name,
      price,
      stock,
      image: req.file.cloudStoragePublicUrl,
      description,
      category,
      UserId: req.decoded.id
    })
      .then(product => {
        res.status(201).json(product);
      })
      .catch(next);
  }
  static readOne(req, res, next) {
    Product.findById(req.params.id)
      .then(product => {
        res.status(200).json(product);
      })
      .catch(next);
  }
  static update(req, res, next) {
    let toUpdate = {}
    for (let keys in req.body) {
      toUpdate[keys] = req.body[keys]
    }
    Product.findByIdAndUpdate(
      req.params.id,
      { $set: toUpdate },
      { new: true }
    )
      .then(product => {
        res.status(200).json(product);
      })
      .catch(next);
  }
  static remove(req, res, next) {
    Product.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).json({message: "Product successfully deleted"});
      })
      .catch(next);
  }
}

module.exports = ProductController;
