const { Cart } = require('../models')

class CartController {
  static getUserCart(req, res, next) {
    Cart.findOne({ customer: req.user._id })
      .populate({
        path: 'customer',
        select: '-password'
      })
      .populate('items/item')
      .then(cart => {
        res.status(200).json({ data: cart })
      })
      .catch(next)
  }

  static createUserCart(user) {
    return Cart.create({
      customer: user._id
    })
  }
}

module.exports = CartController
