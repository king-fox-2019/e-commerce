const { User, Product } = require("../models");

class ProductController {
  static addProduct(req, res, next) {
    const { name, description, price, stock, image } = req.body
    Product.create({
      name: name,
      description: description,
      price: price,
      stock: stock,
      image: image,
      seller: req.decoded._id
    })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  
  static showProducts(req, res, next) {
    Product.find({})
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }
  
  static showProduct(req, res, next) {
    Product.findById(req.params.productId)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static editProduct(req, res, next) {
    const update = {};
    const productId = req.params.productId;
    console.log(productId, '*****')
    const { name, price, stock, description } = req.body;
    if (name) update.name = name;
    if (price) update.price = price;
    if (stock) update.stock = stock;
    if (description) update.description = description;
    Product.findByIdAndUpdate(productId, update)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next);
  }

  static deleteProduct(req, res, next) {
    Product.findByIdAndDelete(req.params.productId)
      .then(response => {
        res.status(200).json({ message: "successfully deleted"})
      })
      .catch(next)
  }

  static addToCart(req, res, next) {
    User.updateOne(
      { _id: req.decoded._id },
      { $push: { cart: req.params.productId } }
    )
      .then(n => {
        res.status(200).json({ message: "successfully added to cart" })
      })
      .catch(next)
  }

  static removeFromCart(req, res, next) {
    User.updateOne(
      { _id: req.decoded._id }
    )
  }
}

module.exports = ProductController