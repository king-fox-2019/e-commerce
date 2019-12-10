const Transaction = require ('../models/transactions')
const Stock = require('../models/stock')

class TransactionController {
   static addToCart(req,res,next){
        Stock.findOne({
            productId : req.params.id,
            number : req.body.size
        })
        .populate('productId')
            .then(stock => {
                if(!stock){
                    res.status(404).json({message : 'product not found'})
                }else{
                    // console.log(stock.productId._id)
                    if(stock.stock > req.body.count){
                        let cart = {
                            Stock_id : stock._id,
                            User_id : req.loggedUser.id,
                            count : req.body.count,
                            total_payment :(req.body.count * stock.productId.price),
                            address : req.body.address
                        }
                        Transaction.create(cart)
                            .then(cart => {
                                res.status(201).json(cart)
                            })
                            .catch(err => {
                                next(err)
                            })
                    }else{
                        next({
                            status : 400,
                            message : 'stock is not enough'
                        })
                }
            }
        })
   }

   static checkOut(req,res,next){
       Transaction.find({
           User_id : req.loggedUser.id
       })
       .then(transactions => {
            transactions.forEach(transaction => {
                let updatedStock = null
                let totalBuy = transaction.count
                Stock.findOne({_id : transaction.Stock_id})
                    .then(stock => {
                        updatedStock = stock.stock - totalBuy
                        return Stock.findOneAndUpdate({_id:stock._id},{stock : updatedStock})
                    })
                    .then( stock => {
                        return Transaction.findOneAndDelete({ _id : transaction._id})
                    })
                    .then( transactions => {
                        res.status(200).json('successfully checked out, thankyou!')
                    })
                })
            })
        .catch (err => {
            next(err)
        })
    }

   static showTransaction(req,res,next){
    Transaction.find({
            User_id : req.loggedUser.id
        })
        .populate('ProductId')
            .then(transaction => {
                res.status(200).json(transaction)
            })
            .catch(next)
    }

    static deleteTransaction(req,res,next){
        Transaction.findByIdAndDelete(req.params.id)
            .then(transaction => {
                res.status(201).json({message : 'transaction successfully deleted'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TransactionController