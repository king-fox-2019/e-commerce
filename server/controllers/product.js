"use strict";
const { Product } = require("../models");

class ProductController {
  static getOneProduct(req, res, next) {
    const { id } = req.params;
    Product.findOne({ _id: id })
      .then((oneProduct) => {
        if (!oneProduct) {
          next({ isThrow: true, status: 404, message: 'Product not found' })
        } else {
          res.status(200).json(oneProduct);
        }
      })
      .catch(next);
  };
  static addNewProduct(req, res, next) {
    let product = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      wear: req.body.wear,
      image: req.body.image,
      about: req.body.about,
    };
    Product.create(product)
      .then(success => {
        res.status(201).json(success);
      })
      .catch(next);
  }
  static destroy(req, res, next) {
    let { id } = req.params;
    Product.deleteOne({ _id: id })
      .then(result => res.status(200).json({ message: 'Product deleted!' }))
      .catch(next);
  }
  static getAllProduct(req, res, next) {
    Product.find()
      .then(products => res.status(200).json(products))
      .catch(next);
  }
}

module.exports = ProductController;
