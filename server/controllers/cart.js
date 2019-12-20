'use strict'

const { Cart, Product, User } = require('../models')

class cartController {
  static addCart(req, res, next) {
    const customer = req.decoded.id
    const itemSelected = req.body.item
    let mycard
    Cart.findOne({ customer }).populate('items')
      .then((cart) => {
        if (!cart) {
          const status = 'pending'
          return Cart.create({ customer, status })
        } else {
          return cart
        }
      })
      .then((cart) => {
        cart.items.push(itemSelected)
        cart.save()
        mycard = cart
        return Product.findById(itemSelected)
      })
      .then((item) => {
        let value = {
          quantity: item.quantity - 1
        }
        return Product.findByIdAndUpdate(item._id, value, { new: true, omitUndefined: true })
      })
      .then((item) => {
        res.status(201).json(mycard)
      })
      .catch(next)
  }
  static deleteCart(req, res, next) {
    const customer = req.decoded.id
    const itemSelected = req.body.item
    let mycard
    Cart.findOne({ customer })
      .then((cart) => {
        let cartIndex = 0
        for(let i = 0; i < cart.items.length; i++) {
          if(cart.items[i] == itemSelected._id) {
            cartIndex = i
            break
          }
        }
        cart.items.splice(cartIndex, 1)
        cart.save()
        mycard = cart
        return Product.findById(itemSelected)
      })
      .then((item) => {
        let value = {
          quantity: item.quantity - 1
        }
        return Product.findByIdAndUpdate(item._id, value, { new: true, omitUndefined: true })
      })
      .then((item) => {
        res.status(201).json(mycard)
      })
      .catch(next)
  }
  static readCart (req, res, next) {
    const customer = req.decoded.id
    Cart.findOne({ customer }).populate('items')
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static checkout (req, res, next) {
    const customer = req.decoded.id
    let value = {
      items: []
    } 
    Cart.findOneAndUpdate({ customer }, value, { new: true, omitUndefined: true }).populate('items')
      .then((cart) => {
        console.log(cart)
        res.status(200).json(cart)
      })
      .catch(next)
  }
}

module.exports = cartController