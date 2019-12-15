const Transaction = require('../models/transaction')

class TransactionController {
    static createTransaction(req,res,next){
        const { listProduct,totalCost } = req.body
        Transaction.create({
            listProduct,
            totalCost,
            UserId: req.decoded.id,
            status: 'onprocess'
        })
        .then(transaction => {
            res.status(201).json(transaction)
        })
        .catch(next)
    }
    
    static sentProduct(req,res,next){
        const { id } = req.params
        Transaction.findOneAndUpdate({
            _id: id
        },
        {
            $set : { status : 'sent' }
        },
        {
            new: true
        })
        .then(transaction => {
            res.status(200).json(transaction)
        })
        .catch(next)
    }

    static receivedProduct(req,res,next){
        const { id } = req.params
        Transaction.findOneAndUpdate({
            _id: id
        },
        {
            $set : { status : 'received' }
        },
        {
            new: true
        })
        .then(transaction => {
            res.status(200).json(transaction)
        })
        .catch(next)
    }

    static getAllTransaction(req,res,next){
        Transaction.find()
            .populate('listProduct.productId')
            .populate('UserId')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static getUserTransaction(req,res,next){
        Transaction.find({
            UserId: req.decoded.id
        })
        .populate('listProduct.productId')
        .populate('UserId')
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(next)
    }
}

module.exports = TransactionController