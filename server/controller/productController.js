const Product = require('../models/product')
const mongoose = require('mongoose')

class productController {
    static getProducts = (req,res,next) => {
        Product.find()
        .then(products=>res.status(200).json(products))
        .catch(err=>next(err))
    }
    static createProduct = (req,res,next) => {
        Product.create({
            name:req.body.name,
            price:req.body.price,
            stock:req.body.stock,
            image:req.body.image
        })
        .then(product=>res.status(201).json(product))
        .catch(err=>next(err))
    } 
    static updateProduct = (req,res,next) => {
        Product.updateOne({_id:mongoose.Types.ObjectId(req.body.id)},{
            name:req.body.name,
            price:req.body.price,
            stock:req.body.stock,
            image:req.body.image
        }, {runValidators: true})
        .then(result=>res.status(201).json(result))
        .catch(err=>next(err))
    }
    static deleteProduct = (req,res,next) => {
        Product.deleteOne({_id:req.body.id})
        .then(result=>res.status(201).json(result))
        .catch(err=>next(err))
    }
}

module.exports = productController