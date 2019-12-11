const Product = require('../models/product')

class ProductController {
    static createProduct(req,res,next){
        const { name,image,price,stock,category } = req.body
        Product.create({
            name,
            image,
            price,
            stock,
            category,
            UserId: req.decoded.id
        })
        .then(product => {
            res.status(201).json(product)
        })
        .catch(next)
    }

    static getAllProduct(req,res,next){
        Product.find({})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static getOneProduct(req,res,next){
        Product.findOne({
            _id: req.params.id
        })
        .then(product => {
            if(product){
                res.status(200).json(product)
            }else{
                throw({
                    status: 404,
                    message: 'There is no product with that id'
                })
            }
        })
        .catch(next)
    }

    static updateProduct(req,res,next){
        let input = req.body
        let form = {}
        for(let data in input){
            form[data] = input[data]
        }
        Product.findOneAndUpdate({_id: req.params.id}, form , 
            { new:true })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static deleteProduct(req,res,next){
        Product.deleteOne({
            _id: req.params.id
        })
        .then(success => {
            res.status(200).json({
                code: 200,
                message: 'Delete Product Success!'
            })
        })  
        .catch(next)
    }
}

module.exports = ProductController