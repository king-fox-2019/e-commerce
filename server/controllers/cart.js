const Cart = require('../models/cart')

class CartController {
    static createCart(req,res,next){
        const { productId,amount } = req.body
        Cart.findOne({
            productId: productId
        })
        .then(cart => {
            if(cart){
                let newAmount = cart.amount + amount
                return Cart.findOneAndUpdate({
                    productId: cart.productId
                },
                {
                    $set: { amount : newAmount }
                },
                {
                    new: true
                })
            }else{
                return Cart.create({
                    productId,
                    amount
                })
            }
        })
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(next)
    }

    static addAmount(req,res,next){
        const { id } = req.params
        Cart.findOne({
            productId: id
        })
        .populate('productId')
        .then(cart => {
            let newAmount = cart.amount + 1
            console.log(cart.productId.stock, newAmount)
            if(cart.productId.stock < newAmount){
                throw({
                    code: 400,
                    message: 'Stock item is not sufficient'
                })
            }else{
                return Cart.findOneAndUpdate({
                    productId: id
                },
                {
                    $set : { amount: newAmount }
                },
                {
                    new: true
                })
            }
        })
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(next)
    }

    static minAmount(req,res,next){
        const { id } = req.params
        Cart.findOne({
            productId: id
        })
        .populate('productId')
        .then(cart => {
            let newAmount = cart.amount - 1
            if(newAmount < 0){
                throw({
                    code: 400,
                    message: 'Item cannot be negative item'
                })
            }else{
                return Cart.findOneAndUpdate({
                    productId: id
                },
                {
                    $set: { amount: newAmount }
                },
                {
                    new: true
                })
            }
        })
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(next)
    }

    static deleteProduct(req,res,next){
        Cart.deleteOne({
            productId: req.params.id
        })
        .then(success => {
            res.status(200).json({
                message: 'Delete Product Success'
            })
        })
        .catch(next)
    }

    static deleteCart(req,res,next){
        Cart.deleteMany({})
            .then(success => {
                res.status(200).json({
                    message: 'Delete Cart Success'
                })
            })
            .catch(next)
    }

    static getAllProduct(req,res,next){
        Cart.find({})
            .populate('productId')
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }
}

module.exports = CartController