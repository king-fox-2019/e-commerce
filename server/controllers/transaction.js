const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Transaction = require('../models/Transaction')

class ControllerTransaction {
  static async fetchAll(req, res, next) {
    try {
      let transactions 
      = await Transaction
        .find()
        .populate({
          path: 'cart',
          populate: [{
            path: 'products.product'
          }, {
            path: 'user'
          }]
        })
        .sort({'createdAt': 'desc'})

      res.status(200).json({ transactions })

    } catch (error) {

      next(error)
    }
  }

  static async fetchUserTransactions(req, res, next) {
    try {
      let query = {}

      if (req.query.active === 'true') {
        query['status'] = { '$ne': 'received' }

      } else if (req.query.history === 'true') {
        query['status'] = 'received'
      }

      let userActiveTransaction 
      = await Transaction
        .find(query)
        .populate({
          path: 'cart',
          populate: {
            path: 'products.product'
          },
          match: {
            user: req.user.id
          }
        })
        .sort({'createdAt': 'desc'})

      res.status(200).json({ transactions: userActiveTransaction })

    } catch (error) {
      next(error)
    }
  }

  static async fetchOne(req, res, next) {
    try {

      let transaction
      = await Transaction
        .findById(req.params.id)
        .populate({
          path: 'cart',
          populate: [{
            path: 'products.product'
          }, {
            path: 'user'
          }]
        })

      res.status(200).json({ transaction })

    } catch (error) {

      next(error)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      // console.log('ini req body pas updateStatus di transaction', req.body)
      let transaction = await Transaction
        .findByIdAndUpdate(
          req.params.id,
          { status: req.body.status },
          { runValidators: true, new: true }
        )
      // console.log('ini transaction with updated status', transaction)
      res.status(200).json({
        message: 'Updated transaction status!', transaction
      })

    } catch (error) {

      next(error)
    }
  }

  static async confirmReceived(req, res, next) {
    try {

      let transaction = await Transaction
        .findById(req.params.id)

      // console.log('ini transaction pas confirm received', transaction)

      if (transaction.status === 'received') throw {
        status: 403,
        message: 'You have already received this order!'
      }

      transaction = await Transaction
        .findByIdAndUpdate(
          req.params.id,
          { status: 'received' },
          { runValidators: true, new: true }
        )
        .populate({
          path: 'cart',
          populate: {
            path: 'products.product'
          }
        })

      let currentQty
      
      for (let product of transaction.cart.products) {
        currentQty = product.product.qty - product.qty
        await Product
          .findOneAndUpdate(
            { _id: product.product._id },
            { qty:  currentQty },
            { runValidators: true, new: true }
          )  
      }
      // transaction.cart.products.forEach(product => {
      //   currentQty = product.product.qty - product.qty
      //   await Product
      //     .findOneAndUpdate(
      //       { 'products.product._id': product.product._id },
      //       { 'products.$.product.qty':  currentQty },
      //       { runValidators: true, new: true }
      //     )  
      // })

      transaction = await Transaction
        .findById(req.params.id)
        .populate({
          path: 'cart',
          populate: {
            path: 'products.product'
          }
        })

      res.status(200).json({
        message: 'Updated transaction status!', transaction
      })

    } catch (error) {

      next(error)
    }
  }
}

module.exports = ControllerTransaction