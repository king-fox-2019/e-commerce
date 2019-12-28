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
            // console.log(response);
            res.status(200).json({
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
                // console.log(response);
                res.status(200).json({
                    total: response.length,
                    data: response
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ItemController;