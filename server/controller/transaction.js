const Transaction = require('../model/transaction');
const Item = require('../model/item');
const User = require('../model/user');

class TransactionController {
    static checkoutCart(req, res, next) {
        Item.findOne({
            _id: req.body.data.item._id
        }).then(responseItem => {
            if (responseItem) {
                if (responseItem.stock >= req.body.data.stock) {
                    req.stockItem = responseItem.stock;
                    return Transaction.create({
                        user: req._id,
                        status: 'paid',
                        itemDetails: responseItem,
                        itemAmount: req.body.data.stock,
                        totalPrice: req.body.data.totalPrice,
                        createdAt: new Date()
                    });
                } else {
                    throw ({
                        code: 400,
                        errMsg: `Stock item not enough, max ${responseItem.stock}`
                    })
                }
            } else {
                throw ({
                    code: 404,
                    errMsg: 'Item'
                })
            }
        }).then(response => {
            return Item.updateOne({
                _id: req.body.data.item._id
            }, {
                stock: (req.stockItem - req.body.data.stock)
            })
        }).then(responseUpdateStock => {
            return User.updateOne({
                _id: req._id
            }, {
                $pull: {
                    cart: {
                        _id: req.body.data._id
                    }
                }
            })
        }).then(responseUpdateUser => {
            res.status(201).json({
                message: "Transaction created",
            });
        }).catch(next);
    }

    static updateStatus(req, res, next) {
        console.log(req.params.status);
        Transaction.updateOne({
            _id: req.params.id
        }, {
            status: req.params.status,
        }).then(response => {
            res.status(200).json({
                message: "Status updated",
                data: response
            })
        }).catch(next)
    }

    static getTransactionsPurchase(req, res, next) {
        Transaction.find({
            user: req._id
        })
            .populate('user', 'name')
            .then(response => {
                res.status(200).json({
                    data: response
                });
            })
            .catch(next)
    }

    static getTransactionsSelling(req, res, next) {
        Transaction.find()
            .populate('user', 'name')
            .then(response => {
                let dataResponse = response.filter(data => {
                    return data.itemDetails.owner.toString() === req._id.toString()
                 });

                res.status(200).json({
                    data: dataResponse
                });
            })
            .catch(next)
    }
}

module.exports = TransactionController;