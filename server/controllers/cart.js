const CartModel = require('../models/cart')
const UserModel = require('../models/user')
const ProductModel = require('../models/product')
module.exports = {
    findAll(req,res,next){
        const { id } = req.loggedUser
        CartModel.find({userId : id})
            .then(cart=>{
                res.status(200).json(cart)
            })
            .catch(next)
    },
    create(req,res,next){
        const { id } = req.params
        const { quantities } = req.body
        CartModel.create({ quantities, userId : req.loggedUser.id, productId : id })
            .then(cart=>{
                res.status(201).json({
                    message : `create cart product success!`,
                    cart
                })
            })
            .catch(next)
    },
    update(req,res,next){
        const { id } = req.params
        let { quantities } = req.body
        CartModel.findOne({ _id : id })
            .then(cart=>{
                return ProductModel.findOne({ _id : cart.productId })
            })
            .then(product=>{
                if (quantities > product.quantities) {
                    throw({
                        status : 400,
                        message : 'sorry quantities is more than product quantities!'
                    })
                } else {
                    quantities = product.price * quantities 
                    return CartModel.findOneAndUpdate({ _id : id },{ quantities },{ new : true, runValidators : true })
                }
            })
            .then(cart=>{
                res.status(200).json({
                    message : `update quantities cart product success!`,
                    cart
                })
            })
            .catch(next)
    },
    updateStatus(req,res,next){
        const { id } = req.params
        const { status } = req.body
        let temporary = {}
        if (status == 'process') {
            CartModel.findOne({_id : id})
                .then(cart=>{
                    temporary.price = cart.price
                    temporary.userId = cart.userId
                    return UserModel.findOne({ _id : cart.userId })
                })
                .then(user=>{
                    if (user.money < temporary.price) {
                        next({
                            status: 400,
                            message : `uang kurang!`
                        })
                    } else {
                        let money = user.money - temporary.price
                        return UserModel.findOneAndUpdate({ _id : temporary.userId },{ money },{ runValidators : true })
                    }
                })
                .then(user=>{
                    return CartModel.findOneAndUpdate({ _id : id },{ status },{ new : true, runValidators : true })
                })
                .then(cart=>{
                res.status(200).json({
                    message : `update status cart ${status} product success!`,
                    cart
                })
            })
            .catch(next)
        } else if (status == 'complete') {
            CartModel.findOneAndUpdate({ _id : id },{ status },{ new : true, runValidators : true })
                .then(cart=>{
                    res.status(200).json({
                        message : `update status cart ${status} product success!`,
                        cart
                    })
                })
                .catch(next)
        } else {
            CartModel.findOneAndUpdate({ _id : id },{ status },{ new : true, runValidators : true })
            .then(cart=>{
                res.status(200).json({
                    message : `update status cart ${status} product success!`,
                    cart
                })
            })
            .catch(next)
        }
    },
    delete(req,res,next){
        const { id } = req.params
        CartModel.findOneAndDelete({_id : id})
            .then(cart=>{
                res.status(200).json({
                    message : `delete cart product success!`,
                    cart
                })
            })
            .catch(next)
    },
    findStatus(req,res,next){
        const { status } = req.params
        if (status != 'oncart' && status != 'process' && status != 'complete') {
            next({
                status : 400,
                message : `find cart on status ${status} failed!`
            })
        } else {
            CartModel.find({ userId : req.loggedUser.id, status })
            .then(cart=>{
                res.status(200).json({
                    message : `find cart on status ${status} success!`,
                    cart
                })
            })
            .catch(next)
        }
    }
}