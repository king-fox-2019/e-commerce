const Product = require('../models/Product')
class ProductController{
    static addProduct(req,res,next){
        const { name, price, description, file, stock } = req.body
        Product.create({ name, price, description, image : file, stock })
            .then( product => {
                res.status(201).json(product)
            })
            .catch(next)
    }
    static listProduct(req, res, next){
        Product.find()
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }
    static detailProduct(req, res, next){
        const _id = req.params.id
        Product.findOne({_id})
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }
    static editProduct(req, res, next){
        const { name, price, description, stock } = req.body
        const _id = req.params.id
        Product.updateOne({ _id }, { name, price, description, stock })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }
    static deleteProduct(req,res,next){
        const _id = req.params.id
        Product.deleteOne({_id})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static changePicture(req,res,next){
        const { file } = req.body
        const _id = req.params.id
        Product.updateOne({ _id }, { image:file })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

}
module.exports = ProductController