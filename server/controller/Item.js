const Item = require('../model/item');

class ItemController {
    static register(req, res, next) {
        Item.create({
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            image: req.body.image,
            owner: req._id,
            description: req.body.description
        }).then(response => {
            res.status(201).json({
                message: "Item successfully registered"
            })
        }).catch(err => {
            next(err)
        })
    }

    static list(req, res, next) {
        Item.find()
            .populate('owner', 'name ')
            .then(response => {
                res.status(200).json({
                    data: response
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static findItem(req, res, next) {
        Item.find({
                name: {$regex: req.params.itemName, $options: 'i'}
            })
            .populate('owner', 'name ')
            .then(response => {
                res.status(200).json({
                    data: response
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ItemController;