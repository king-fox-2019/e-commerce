const Product = require('../models/product')
const Stock = require('../models/stock')

class productController{
    static showAll(req,res,next){
        
        Product.find()
        .populate('stock')
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }
    static findOne(req,res,next){
        Product.find({
            _id : req.params.id
        })
        .populate('productId')
        .populate('stock')
            .then(one => {
                res.status(200).json(one)
            })
            .catch(next)
    }

    static create(req,res,next){
        Product.create({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            images : req.body.images,
            tags : req.body.tags
        }) 
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req,res,next){
        Product.findByIdAndDelete(req.params.id)
            .then(product => {
                return Stock.deleteMany({
                    productId : product._id
                })
            })
            .then(stock => {
                res.status(200).json({message : `product successfully deleted`})
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req,res,next){
        const {name,description,price,images,tags} = req.body
        if(!name || !description || !price || !tags || !images ){
            throw {
                status : 400,
                message : 'name, description, price,cand stock cannot be blank'
            }
        }
        Product.findOneAndUpdate({_id : req.params.id}, {name,description,price,tags,images}, { new : true})
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}


module.exports = productController