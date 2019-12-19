const Transaction = require('../models/transaction')
const User = require('../models/user')
const Product = require('../models/product')

class TransactionController{
  static getTransaction(req, res, next){
    Transaction.find({ user_id: req.loggedUser.id })
    .populate('products.product_id')
    .sort({ createdAt: 'desc' })
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static adminFindAll(req, res, next){
    Transaction.find()
      .populate('products.product_id')
      .populate('user_id')
      .sort({ createdAt: 'desc' })
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static async createTransaction(req, res, next){
    try{
      const loggedUser = req.loggedUser
      const user = await User.findOne({ _id: loggedUser.id })
      .populate('cart.product_id')

      if(user.cart.length === 0){
        throw { status: 400, message: 'Your cart is empty' }
      }

      user.cart.forEach(product=>{        
        if(product.product_id.stock - product.quantity < 0){
          throw { status: 400, message: `Sorry we do not have any more stock for this item: ===${product.product_id.name}===, we only have ${product.product_id.stock} piece(s) available for now` }
        }
      })

      user.cart.forEach(async product=>{
        const temp = await Product.updateOne({ _id: product.product_id._id }, {
          stock: product.product_id.stock - product.quantity
        })
      })

      let cartTransaction = user.cart
      
      for(let cart in cartTransaction){
        const product_id = cartTransaction[cart].product_id._id
        cartTransaction[cart].product_id = product_id
      }

      let transactionDone

      Transaction.create({
        user_id: user._id,
        products: cartTransaction
      })
        .then(transaction => {
          transactionDone = transaction
          return User.updateOne({ _id: loggedUser.id }, {
            $set: { cart: [] }
          })
        })
        .then(num => {
          res.status(201).json(transactionDone)
        })
        .catch(next)
    }
    catch(err){
      next(err)
    }
  }

  static transactionDone(req, res, next){
    const { id } = req.params
    Transaction.updateOne({ _id: id }, { status: true })
    .sort({ createdAt: 'desc' })
      .then(num => {
        res.status(200).json(num)
      })
      .catch(next)
  }
}

module.exports = TransactionController