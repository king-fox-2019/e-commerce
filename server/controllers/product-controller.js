const {Product} = require('../models');

class ProductController {
  static getAllProducts(req, res, next) {
    Product.find()
      .then(function(products) {
        res.status(200).json(products);
      })
      .catch(next);
  }

  static getDetailProduct(req, res, next) {
    Product.findById(req.query.productId)
      .then(function(product) {
        if (!product)
          throw {
            name: 'ProductNotFound',
            message: 'Product that you are looking is not found',
          };
        else res.status(200).json(product);
      })
      .catch(next);
  }

  static addNewProduct(req, res, next) {
    Product.create(req.body)
      .then(function(product) {
        res.status(201).json({message: 'Success add new product'});
      })
      .catch(next);
  }

  static deleteProduct(req, res, next) {
    Product.findByIdAndDelete(req.query.productId)
      .then(function(product) {
        if (!product)
          throw {
            name: 'ProductNotFound',
            message: 'Product that you are looking is not found',
          };
        else res.status(200).json({message: 'Success delete product'});
      })
      .catch(next);
  }

  static updateProduct(req, res, next) {
    Product.findByIdAndUpdate(req.query.productId, req.body)
      .then(function(product) {
        if (!product)
          throw {
            name: 'ProductNotFound',
            message: 'Product that you are looking is not found',
          };
      })
      .catch(next);
  }
}

module.exports = {ProductController};
