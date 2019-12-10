const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Transaction = require('../models/Transaction')

class ControllerTransaction {
  static async fetchAll(req, res, next) {
    try {
      let transactions = await Transaction.find()

      res.status(200).json({ transactions })

    } catch (error) {

      next(error)
    }
  }

  static async fetchOne(req, res, next) {
    try {

      let transaction = await Transaction.findById(req.params.id)

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
        .findByIdAndUpdate(
          req.params.id,
          { status: 'received' },
          { runValidators: true, new: true }
        )

      res.status(200).json({
        message: 'Updated transaction status!', transaction
      })

    } catch (error) {

      next(error)
    }
  }
}

module.exports = ControllerTransaction