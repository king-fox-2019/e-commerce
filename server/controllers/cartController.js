const { Cart, Product } = require("../models")
const { ObjectID } = require('mongodb')

class CartController {
  static addCart(req, res, next) {
    let newCart;
    let amount = Number(req.body.amount)
    Cart.findOne({
      productId: req.body.productId,
      userId: req.decoded._id
    })
      .then(cart => {
        if (cart) {
          return Cart.findByIdAndUpdate(cart._id, {
            amount: cart.amount + amount
          })
        } else {
          return Cart.create({
            userId: req.decoded._id,
            productId: req.body.productId,
            amount: amount
          })
        }
      })
      .then(cart => {
        newCart = cart
        return Product.findByIdAndUpdate(req.body.productId, {
          $inc: { stock: -amount}
        })
      })
      .then(product => {
        res.status(201).json(newCart)
      })
      .catch(next)
  }

  static showCart(req, res, next) {
    Cart.find({ userId: req.decoded._id })
      .populate('productId')
      .then(items => {
        console.log(items)
        res.status(200).json(items)
      })
      .catch(next)
  }

  static deleteItem(req, res, next) {
    let amount = Number(req.body.amount)
    Cart.findById(req.params.cartId)
      .then(cart => {
        return Product.findByIdAndUpdate(cart.productId, {
          $inc: { stock: +amount}
        })
      })
      .then(n => {
        return Cart.findByIdAndDelete(req.params.cartId)
      })
      .then(n => {
        res.status(200).json({ message: 'successfully deleted'})
      })
      .catch(next)
  }
}


module.exports = CartController