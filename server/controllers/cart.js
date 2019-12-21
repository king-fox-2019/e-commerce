const Cart = require('../models/Cart');

class CartController {
    static fetchCart(req, res, next) {
        Cart
            .findOne({user: req.decoded.id, isActive: true})
            .populate('products.item')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static addToCart(req, res, next) {
        Cart
            .findOne({user: req.decoded.id, isActive: true})
            .then(data => {
                if (!data) {
                    CartController.create(req, res, next)
                } else {
                    req.data = data;
                    CartController.insert(req, res, next)
                }
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { item, quantity } = req.body;
        Cart    
            .create({
                user: req.decoded.id,
                products: [{
                    item, quantity
                }],
                isActive: true
            })
            .then(cart => {
                res.status(201).json(cart)
            })
            .catch(next)
    }

    static insert(req, res, next) {
        const { data } = req;
        const { item, quantity } = req.body;
        let oldValue = data.products.find(x => x.item == item);

        if (typeof oldValue === 'object') {
            oldValue = oldValue.quantity
            Cart
                .findOneAndUpdate({
                    _id: data._id,
                    'products.item': item
                },{ 
                    $set: {
                        'products.$.quantity': oldValue + quantity
                    }
                },{
                    returnOriginal: false
                })
                .populate('products.item')
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(next)

        } else {
            Cart
                .findOneAndUpdate({
                    _id: data._id
                },{ 
                    $push: { 'products': {item, quantity} }
                },{
                    upsert: true,
                    returnOriginal: false
                })
                .populate('products.item')
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(next)
        }        
    }

    static removeFromCart(req, res, next) {
        const { item, quantity } = req.body;

        Cart
            .findOne({user: req.decoded.id, isActive: true})
            .then(data => {
                if (!data) {
                    let err = {
                        status: 404,
                        msg: "Cart not found"
                    }
                    next(err)
                } else {
                    let oldValue = data.products.find(x => x.item == item);
                   
                    if (typeof oldValue === 'object') {
                        oldValue = oldValue.quantity
                    }

                    let resQuantity = (oldValue - quantity <= 0) ? 0 : oldValue - quantity;

                    if (resQuantity === 0) {
                        Cart
                            .findOneAndUpdate({
                                _id: data._id
                            },{ 
                                $pull: { products: { item } }
                            },{
                                returnOriginal: false
                            })
                            .populate('products.item')
                            .then(data => {
                                res.status(200).json(data)
                            })
                            .catch(next)
                    } else {
                        Cart
                            .findOneAndUpdate({
                                _id: data._id,
                                'products.item': item
                            },{ 
                                $set: {
                                    'products.$.quantity': resQuantity
                                }
                            },{
                                returnOriginal: false
                            })
                            .populate('products.item')
                            .then(data => {
                                res.status(200).json(data)
                            })
                            .catch(next)
                    }
                }
            })
            .catch(next)
    }
}

module.exports = CartController;