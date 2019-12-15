const Product = require('../models/Product');
const imageUploader = require('../helpers/imageUploader');

class ProductController {
    static create(req, res, next) {
        const { name, price, stock, image } = req.body;
        Product
            .create({
                name, 
                price: JSON.parse(price), 
                stock: JSON.parse(stock),
                image: image
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static showOne(req, res, next) {
        Product
            .findById(req.params.id)
            .then( data => {
                if (!data) {
                    let err = {
                        status: 404,
                        msg: 'Product not found'
                    }
                    next(err)
                } else {
                    res.status(200).json(data)
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static showAll(req, res, next) {
        Product
            .find()
            .then( datas => {
                res.status(200).json(datas);
            })
            .catch( err => {
                next(err);
            })
    }

    static update(req, res, next) {
        console.log(req.body)
        const { name, price, image, stock } = req.body;
        Product
            .findOneAndUpdate({_id: req.params.id}, 
                { name, price, image, stock },
                { returnOriginal: false })
            .then( data => {
                console.log(data)
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static destroy(req, res, next) {
        Product
            .findByIdAndRemove({_id: req.params.id})
            .then( data => {
                if (!data) {
                    let err = {
                        status: 404,
                        msg: 'Product not found'
                    }
                    next(err);
                } else {
                    res.status(200).json(data)
                }     
            })
            .catch( err => {
                next(err);
            })
    }
}

module.exports = ProductController;