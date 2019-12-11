const { Transaction, Cart } = require('../models')
const mongoose = require('mongoose')

class TransactionController {
  static createTransaction(req, res, next) {
    // let transactionId
    let session
    mongoose
      .startSession()
      .then(_session => {
        session = _session
        session.startTransaction()
        return Cart.findOne({ customer: req.user._id }).populate('items.item')
      })
      .then(cart => {
        return Transaction.create({
          customer: req.user._id,
          items: cart.items.map(val => {
            const item = val.item
            return {
              name: item.name,
              image: item.image,
              price: item.price,
              amount: val.amount
            }
          })
        })
      })
      .then(transaction => {
        // transactionId = Transaction._id
        return Cart.findOneAndUpdate(
          { customer: req.user._id },
          { items: [] }
        ).then(() => {
          return transaction.populate('customer', '-password').execPopulate()
        })
      })
      .then(transaction => {
        session.commitTransaction()
        res.status(201).json({
          message: 'Transaction created',
          data: transaction
        })
      })
      .catch(next)
  }

  static updateTransactionStatus(req, res, next) {
    Transaction.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      { omitUndefined: true, new: true }
    )
      .populate('customer', '-password')
      .then(transaction => {
        res.status(200).json({
          message: 'Transaction status updated',
          data: transaction
        })
      })
      .catch(next)
  }

  static getAllTransactions(req, res, next) {
    Transaction.find().then(transactions => {
      res.status(200).json({ data: transactions })
    })
  }

  static getAllUserTransactions(req, res, next) {
    Transaction.find({ customer: req.params.id }).then(transactions => {
      res.status(200).json({ data: transactions })
    })
  }

  static getOneTransaction(req, res, next) {
    Transaction.findById(req.params.id).then(transaction => {
      res.status(200).json({ data: transaction })
    })
  }
}

module.exports = TransactionController
