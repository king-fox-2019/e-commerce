//models
const Cart = require('../models/cart')

class CartCon {
    static  create(req,res,next){
        req.body.customer = req.user._id
        Cart.create(req.body)
            .then(item => {
                res.status(201).json(item)
            })
            .catch(next)
    }
    static findAll(req,res,next){
        Cart.find({customer : req.user._id}).populate("product")
        .then(data => {            
            res.status(200).json(data)
        })
        .catch(next)
    }
    static findOne(req,res,next){
        Cart.findOne({_id : req.params.id})
        .then(item => {
                res.status(200).json(item)
        })
        .catch(next)
    }
    static remove(req,res,next){
        Cart.deleteOne({ _id : req.params.id})
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(next)
    }
    static update(req,res,next){
        Cart.updateOne({_id:req.params.id},req.body)
        .then(respone=>{
            res.status(200).json(respone)
        })
        .catch(next)
    }
}

module.exports = CartCon