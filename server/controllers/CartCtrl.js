const Cart = require('../models/Cart')

class CartCtrl {

  static getCart(req, res, next) {
    console.log(req.decodedId)
    const userId = req.decodedId
    Cart.find({userId})
      .populate('Product')
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(next)
  }

  static addProduct(req, res, next) {
    const userId = req.decodedId
    const productId = req.params.productId
    const { quantity } = req.body

    Cart.create({
      userId,
      productId,
      quantity
    })
      .then(result => {
        res.status(201).json({result, message: 'Product added to cart'})
      })
      .catch(next)
  }

  static updateProduct(req, res, next) {
    const id = req.params.cartId
    const { quantity } = req.body
    Cart.findOneAndUpdate({_id:id}, { quantity })
      .then(product => {
        res.status(200).json({product, message: 'Product succesfully updated'})
      })
      .catch(next)
  }

  static deleteProduct(req, res, next) {
    const id = req.params.cartId
    Cart.findOneAndDelete({_id:id})
      .then(product => {
        res.status(200).json({product, message: 'Product succesfully deleted'})
      })
      .catch(next)
  }

  static deleteCart(req, res, next) {
    const userId = req.decodedId
    Cart.deleteMany({userId})
      .then(cart => {
        res.status(200).json({cart, message: 'Cart succesfully deleted'})
      })
      .catch(next)
  }

}

module.exports = CartCtrl