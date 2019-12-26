const { Cart, Item } = require('../models')
const mongoose = require('mongoose')

class CartController {
  static getUserCart(req, res, next) {
    Cart.findOne({ customer: req.user._id })
      .populate({
        path: 'customer',
        select: '-password'
      })
      .populate('items.item', '-stock')
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

  static updateUserCart(req, res, next) {
    let stockAmountUpdate
    let session
    mongoose
      .startSession()
      .then(_session => {
        session = _session
        session.startTransaction()
        return Cart.findOne({ customer: req.user._id })
      })
      .then(cart => {
        if (req.body.amount > 0) {
          for (const item of cart.items) {
            if (item.item == req.body.item) {
              stockAmountUpdate = req.body.amount - item.amount
              item.amount = req.body.amount
              return cart.save()
            }
          }
          stockAmountUpdate = req.body.amount
          cart.items.push({ item: req.body.item, amount: req.body.amount })
          return cart.save()
        } else {
          for (const item of cart.items) {
            if (item.item == req.body.item) {
              stockAmountUpdate = req.body.amount - item.amount
              cart.items.pull(item)
              return cart.save()
            }
          }
        }
      })
      .then(cart => {
        return Item.findById(req.body.item)
          .then(item => {
            item.stock = item.stock - stockAmountUpdate
            return item.save()
          })
          .then(item => {
            return cart
              .populate({
                path: 'customer',
                select: '-password'
              })
              .populate('items.item', '-stock')
              .execPopulate()
          })
          .then(cart => {
            session.commitTransaction()
            res.status(200).json({ message: 'Cart item updated', data: cart })
          })
      })
      .catch(next)
  }
}

module.exports = CartController
