const { Cart, User, Item, Transaction } = require('../models')

class TransactionController {
    
    static create(req, res, next) {
        let items = req.body.items.split(',')
        items.splice(items.length-1,1)
        let totalPrice = req.body.price + req.body.ongkir
        Transaction.create({
            userId: req.loggedUser.id,
            itemId: items,
            ongkir: req.body.ongkir,
            price: req.body.price,
            totalPrice
        })
        .then(bill => {
            res.status(201).json(bill)
        })
        .catch(next)
    }

    static showAllUser(req, res, next) {
        Transaction.find({userId: req.loggedUser.id})
            .populate('itemId')
            .then(bills => {
                res.status(200).json(bills)
            })
            .catch(next)
    }

    static showAllAdmin(req, res, next) {
        Transaction.find()
            .populate('itemId')
            .populate('userId')
            .exec(function (err, carts) {
                // callback
                if (err) next()
                else res.status(200).json({carts})
           });
    }

    static confirm(req, res, next) {
        Transaction.findByIdAndUpdate(req.params.transactionId, {status: 'delivered'}, {new: true})
            .then(bill => {
                res.status(200).json(bill)
            })
            .catch(next)
    }
}

module.exports = TransactionController