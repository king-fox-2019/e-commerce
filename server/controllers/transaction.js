const Transaction = require('../models/Transaction');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

class TransactionController {
    static checkout(req, res, next) {
        const { products } = req.body.cart;
        let err;
        let errors = []
        let transactionProducts = []
        let total = 0;

        let promises = products.map(function(cartProduct) {
           
            return Product
                .findById(cartProduct.item)
                .then(product => {
                    if (!product) {
                        err = {
                            id: product._id,
                            msg: 'Product does not exist'
                        }
                        errors.push(err)
                    } else if (cartProduct.quantity > product.stock) {
                        err = {
                            id: product._id,
                            msg: `${product.name} is out of Stock.`
                        }
                        errors.push(err)
                    } else {
                        let newObj = {
                            name: product.name,
                            price: product.price,
                            quantity: cartProduct.quantity,
                            image: product.image
                        }
                        total += (product.price * cartProduct.quantity)

                        transactionProducts.push(newObj)

                        Product.findByIdAndUpdate({
                            _id: product._id
                        },{
                            stock: product.stock - cartProduct.quantity
                        })
                        .then(data => {
                            let updated = data;
                        })
                        .catch(next)
                    }
                })
                .catch(next)
          
        })
          
        Promise.all(promises)
            .then(function(data) {
                if (errors.length != 0) {
                    res.status(400).json(errors)
                } else {
                    req.body.products = transactionProducts;
                    req.body.total = total;
                    
                    Cart
                        .findOneAndUpdate({
                            _id:req.body.cart._id
                        },{ 
                            isActive: false
                        })
                        .then(cart => {
                            TransactionController.create(req, res, next);
                        })
                        .catch(next)
                }
            })
            .catch(function(e) {
                next(e)
            });
    }

    static create(req, res, next) {
        const { products, total } = req.body;
        Transaction
            .create({
                user: req.decoded.id,
                products,
                total
            })
            .then(data => {
                res.status(201).json(data);
            })
            .catch(next)
    } 

    static updateStatus(req, res, next) {
        const { status } = req.body;
        Transaction
            .findOneAndUpdate({
                _id: req.params.id
            },{
                status
            },{
                returnOriginal: false
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
            
    }

    static showAll(req, res, next) {
        Transaction
            .find({ user: req.decoded.id })
            .populate('user', 'name email -_id')
            .sort('-createdAt')
            .then(datas => {
                res.status(200).json(datas)
            })
            .catch(next)
    }

    static showOne(req, res, next) {
        Transaction
            .findById(req.params.id)
            .then(data => {
                if (!data) {
                    let err = {
                        status: 404,
                        msg: 'Transaction not found'
                    }
                    next(err);
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(next)
    }

    static showAllAdminAccess(req, res, next) {
        Transaction
            .find()
            .populate('user', 'email')
            .then(datas => {
                res.status(200).json(datas)
            })
            .catch(next)
    }
}

module.exports = TransactionController;