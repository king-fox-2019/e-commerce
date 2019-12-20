const Product = require('../models/Product');

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
        const { name, price, image, stock } = req.body;

        let obj = {
            name, 
            price: JSON.parse(price), 
            stock: JSON.parse(stock)
        }

        if (image) {
            obj.image = image;
        }

        Product
            .findOneAndUpdate({_id: req.params.id}, obj,{ 
                returnOriginal: false 
            })
            .then( data => {
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