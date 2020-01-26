const User = require('../model/user');
const Item = require('../model/item');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
    static reqisterUser(req, res, next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cart: []
        }).then(response => {
            let token = jwt.sign({userId: response._id}, process.env.SECRET_KEY);
            let name = response.name.split(" ");
            res.status(201).json({
                name: name[0],
                token: token,
                message: "User successfully registered"
            })
        }).catch(next)
    }

    static loginUser(req, res, next) {
        User.findOne({
            email: req.body.email
        }).then(response => {
            if (!response) throw {
                code: 404,
                errMsg: 'User/ password'
            };
            let isMatch = bcrypt.compareSync(req.body.password, response.password);
            if (!isMatch) throw {
                code: 404,
                errMsg: 'User/ password'
            };
            let token = jwt.sign({userId: response._id}, process.env.SECRET_KEY);
            let name = response.name.split(" ");
            res.status(200).json({
                name: name[0],
                token: token,
                message: "User successfully login"
            })
        }).catch(next)
    }

    static findUserid(req, res, next) {
        User.findById(
            req._id
        ).then(response => {
            let token = jwt.sign({userId: response._id}, process.env.SECRET_KEY);
            let name = response.name.split(" ");
            res.status(200).json({
                name: name[0],
                token: token,
                message: "User successfully verified"
            })
        }).catch(next)
    }

    static addToCart(req, res, next) {
        // console.log(req.body.cart);

        Item.findOne({
            _id: req.body.cart.item
        }).then(responseItem => {
            if (responseItem) {
                if (responseItem.owner.toString() === req._id.toString()) {
                    throw {
                        code: 403,
                        errMsg: "You are not allowed to buy your own item"
                    }
                } else {
                    req.stockItem = responseItem.stock;
                    return User.findOne({
                        _id: req._id
                    })
                }
            } else {
                throw {
                    code: 404,
                    errMsg: "Item"
                }
            }
        }).then(responseUser => {
            let currentCartStock = 0;
            responseUser.cart.forEach(items => {
                if (items.item.toString() === req.body.cart.item) {
                    currentCartStock = items.stock
                }
            });

            if (currentCartStock > 0) {
                if ((currentCartStock + req.body.cart.stock) > req.stockItem) {
                    throw {
                        code: 400,
                        errMsg: `You can add item maksimal ${(req.stockItem - currentCartStock)} items`
                    }
                } else {
                    let carts = responseUser.cart;
                    carts.forEach(cart => {
                        if (cart.item.toString() === req.body.cart.item.toString()) {
                            cart.stock += req.body.cart.stock
                        }
                    });

                    return User.updateOne({
                        _id: req._id
                    }, {
                        cart: carts
                    })
                }
            } else {
                return User.updateOne({
                    _id: req._id
                }, {
                    $push: {
                        cart: {
                            item: req.body.cart.item,
                            stock: req.body.cart.stock,
                            totalPrice: (req.body.cart.price * req.body.cart.stock)
                        }
                    }
                })
            }
        }).then(responseFinalUpdate => {
            res.status(200).json({
                message: "item successfully add to cart"
            });
        }).catch(next);
    }

    static deleteCartItem(req, res, next) {
        User.updateOne({
            _id: req._id
        }, {
            $pull: {
                cart: {
                    _id: req.params.id
                }
            }
        }).then(response => {
            if (response.ok < 1) throw "cart item failed to remove";
            res.status(200).json({
                message: "item successfully remove from cart"
            });
        }).catch(next)
    }

    static viewUser(req, res, next) {
        User.findById(
            req._id
        ).populate(
            'cart.item'
        ).then(response => {
            res.status(200).json({
                data: response
            })
        }).catch(next)
    }
}

module.exports = UserController;