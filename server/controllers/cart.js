const CartModel = require('../models/cart')
const UserModel = require('../models/user')
const ProductModel = require('../models/product')
const StockModel = require('../models/stock')
module.exports = {
    findAll(req,res,next){
        const { id } = req.loggedUser
        CartModel.find({userId : id})
            .populate('productId')
            .populate('size')
            .then(cart=>{
                res.status(200).json(cart)
            })
            .catch(next)
    },
    create(req,res,next){
        const { id } = req.params
        const { size, quantities, price } = req.body
        var options = {}
        var flag
        ProductModel.findOne({ _id : id })
            .populate('size')
            .then(product=>{
                product.size.forEach(el => {
                    if (el.size == size) {
                        options.maxStock = el.stock
                        options.stockId = el._id
                    }
                })
                return CartModel.findOne({ productId : id })  
            })
            .then(cartProduct=>{
                if (cartProduct) {
                    options.quantitiesCalt = Number(quantities) + Number(cartProduct.quantities)
                    options.priceCalt = Number(cartProduct.price) + Number(price)
                    if (options.quantitiesCalt > options.maxStock) {
                        next({
                            status: 400,
                            message: 'melebihi jumlah barang asli!'
                        })
                    }
                    return CartModel.findOneAndUpdate({ _id : cartProduct._id }, { quantities: options.quantitiesCalt, price: options.priceCalt }, { new: true, runValidators: true })
                } else {
                    flag = true
                    return CartModel.create({ quantities, price, productId: id, userId: req.loggedUser.id, size: options.stockId })
                }
            })
            .then(result=>{
                if (flag) {
                    res.status(201).json(result)
                } else {
                    res.status(200).json(result)
                }
            })
            .catch(next)
    },
    update(req,res,next){
        const { id } = req.params
        let { quantities, price, size } = req.body
        CartModel.findOneAndUpdate({ _id : id },{ quantities, price },{ new:true, runValidators:true })
            .then(cart=>{
                res.status(200).json({
                    message : `update cart success!`,
                    cart
                })
            })
            .catch(next)
    },
    updateStatus(req,res,next){
        const { id } = req.params
        const { status, idStock, qty, sold } = req.body
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
                    return StockModel.findOneAndUpdate({ _id: idStock },{ stock: qty, sold },{ new: true, runValidators:true })
                })
                .then(stock=>{
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
        } else if (status == 'confirm') {
            CartModel.findOneAndUpdate({ _id : id },{ status },{ new : true, runValidators : true })
                .then(cart=>{
                    res.status(200).json({
                        message : `update status cart ${status} product success!`,
                        cart
                    })
                })
                .catch(next)
        }  else {
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
        if (status != 'oncart' && status != 'process' && status != 'confirm' && status != 'complete') {
            next({
                status : 400,
                message : `find cart on status ${status} failed!`
            })
        } else {
            CartModel.find({ status })
                .populate('userId')
                .populate('productId')
                .populate('size')
            .then(cart=>{
                res.status(200).json({
                    message : `find cart on status ${status} success!`,
                    cart
                })
            })
            .catch(next)
        }
    },
    findStatusByAdmin(req,res,next){
        const { status } = req.params
        if (status != 'oncart' && status != 'process' && status != 'confirm' && status != 'complete') {
            next({
                status : 400,
                message : `find cart on status ${status} failed!`
            })
        } else {
            CartModel.find({ status })
            .then(cart=>{
                res.status(200).json({
                    message : `find cart on status ${status} success!`,
                    cart
                })
            })
            .catch(next)
        }
    },
    findOneStock(req,res,next){
        StockModel.findOne({ _id : req.params.id })
            .then(cart=>{
                res.status(200).json({
                    message: 'find stock success',
                    cart
                })
            })
            .catch(next)
    }
}