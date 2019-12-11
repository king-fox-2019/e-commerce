`use strict`

const Product = require('../models/product')

class Controller {

    static showAllProducts(req, res, next) {
        Product
            .find()
            .then((products) => {
                res.status(400).json(products)
            })
            .catch(next);
    }

    static addProduct(req, res, next) {
        Product
            .create({
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                owner: req.decode.id
            })
            .then((product) => {
                res.status(201).json(product)
            })
            .catch(next);
    }

    static myproduct(req, res, next) {
        Product
            .find({
                where: {
                    owner: req.decode.id
                }
            })
            .then((products) => {
                res.status(200).json(products)
            })
            .catch(next);
    }

    static deleteProduct(req, res, next) {
        Product.findOneAndRemove(req.params.id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next);
    }

    static updateProductData(req, res, next) {
        const objectForPatch = {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity
        }

        Product.findOneAndUpdate(req.params.id, objectForPatch)
            .then((product) => {
                res.status(200).json(product)
            })
            .catch(next)
    }

}

module.exports = Controller