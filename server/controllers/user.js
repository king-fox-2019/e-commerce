const User = require('../models/User')
const {compare} = require('../helpers/encrypt')
const { generate } = require('../helpers/token')
class UserController{
    static adminAccess(req, res, next){
        if(req.params.password == 'renaultdzaky'){
            let access_token = generate({id:'renotjaki'})
            res.status(200).json({access_token})
        }else{
            res.status(400).json({message : 'only admin can access'})
        }
    }
    static register(req, res, next){
        let { email, password, name } = req.body
        let cart = []
        User.create({ email,password,name,cart })
            .then(user => {
                let access_token = generate({id:user._id})
                res.status(201).json({access_token})
            })
            .catch(next)
    }
    static login(req, res, next){
        const { email,password } = req.body
        User.findOne({email})
            .then(user => {
                if(user && compare( password, user.password )){
                    let access_token = generate({id:user._id})
                    res.status(200).json({access_token})
                }else{
                    next({code:400, message:'wrong username or password'})
                }
            })
            .catch(next)
    }
    static getCart(req,res,next){
        const _id = req.id
        User.findOne({ _id }).populate('cart.product')
            .then(user => {
                res.status(200).json(user.cart)
            })
            .catch(next)
    }
    static addToCart(req, res, next){
        const _id = req.id
        const { product, amount } = req.body
        User.findOne({_id, cart :{$elemMatch:{ product : product }}})
            .then(user => {
                if(user){
                    let currentProd = user.cart.filter(produk => produk.product == product)
                    let newAmount = currentProd[0].amount + Number(amount)
                    return User.updateOne({ _id, 'cart.product':product }, { $set:{ 'cart.$.amount':newAmount } })
                }else{
                    console.log(_id)
                    return User.updateOne({ _id }, { $push:{ cart:{ product, amount } } })
                }
            })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }
    static decreaseAmount(req, res, next){
        const _id = req.id
        const { product } = req.body
        User.findOne({ _id })
            .then( user => {
                let currentProd = user.cart.filter(produk => produk.product == product)
                let newAmount = currentProd[0].amount - 1
                return User.updateOne({ _id, 'cart.product':product }, { $set:{ 'cart.$.amount':newAmount }})
            })
            .then( user => {
                res.status(200).json(user)
            })
            .catch(next)
    }
    static deleteFromCart(req, res, next){
        const _id = req.id
        const { product } = req.body
        User.updateOne({ _id }, { $pull: { cart: { product : product } } })
            .then( user => {
                res.status(200).json(user)
            })
            .catch(next)
    }
    static emptyCart(req,res,next){
        const _id = req.id
        User.updateOne({ _id }, {$set: {cart : []}})
            .then( user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

}
module.exports = UserController