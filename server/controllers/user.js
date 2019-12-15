const User = require('../models/user'),
    { compare } = require('../helpers/bcrypt'),
    { generateToken } = require('../helpers/jwt'),
    { OAuth2Client } = require('google-auth-library');

class UserController {

    static register(req, res, next) {
        let { username, email, password, isAdmin } = req.body
        User.create({ username, email, password, isAdmin })
            .then(newUser => {
                res.status(201).json({ message: 'successful register', newUser })
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        User.find()
            .then(users => {
                res.json(users)
            })
            .catch(next)
    }

    static login(req, res, next) {
        let { email, password } = req.body
        // console.log(req.body);
        User.findOne({
            email: email
        })
            .populate({ path: "cart.product_id" })
            .then(user => {
                // console.log(user);
                if (!user) {
                    next({ status: 400, message: 'Invalid password or email' })
                } else {
                    let authPass = compare(password, user.password)
                    if (authPass) {
                        let payload = {
                            username: user.username,
                            email: user.email,
                            cart: user.cart,
                            id: user._id,
                            isAdmin: user.isAdmin
                        }

                        let token = generateToken(payload)
                        res.status(200).json({ token, user: payload })
                    } else {
                        next({ status: 400, message: 'Invalid password or email' })
                    }
                }
            })
            .catch(next)
    }


    static addToCart(req, res, next) {
        // console.log(req.body);
        let { product_id, quantity } = req.body
        let loggedUser = req.loggedUser
        let cartQuantity
        let isDuplicate = false
        if (!product_id || !quantity || quantity == 0) {
            res.status(400).json({ message: 'bad request' })
        } else {
            User.findOne({ _id: loggedUser.id })
                .populate('cart.product_id')
                .then(user => {
                    user.cart.forEach(product => {
                        if (product.product_id._id == product_id) {
                            cartQuantity = product.quantity
                            isDuplicate = true
                        }
                    })

                    if (isDuplicate) {
                        const totalQuantity = Number(cartQuantity) + Number(quantity)
                        User.updateOne({ _id: loggedUser.id, 'cart.product_id': product_id }, { $set: { 'cart.$.quantity': totalQuantity } })
                            .then(result => {
                                res.status(200).json(result)
                            })
                            .catch(next)
                    } else {
                        let newItem = {
                            product_id,
                            quantity
                        }
                        User.updateOne({ _id: loggedUser.id }, { $push: { cart: newItem } })
                            .then(result => {
                                res.status(200).json(result)
                            })
                            .catch(next)
                    }
                })
        }
    }

    static subtractFromCart(req, res, next) {
        let { product_id } = req.body
        let loggedUser = req.loggedUser
        let isExist = false
        let quantity = -1
        if (!product_id) {
            res.status(400).json({ message: 'bad request' })
        } else {
            User.findOne({ _id: loggedUser.id })
                .then(user => {
                    user.cart.forEach(product => {
                        if (product.product_id == product_id) {
                            quantity = Number(product.quantity) - 1
                            isExist = true
                        }
                    })

                    if (isExist && quantity > 0) {
                        return User.updateOne({ _id: loggedUser.id, 'cart.product_id': product_id }, { $set: { 'cart.$.quantity': quantity } })
                    } else {
                        if (quantity == 0) {
                            return User.updateOne({ _id: loggedUser.id }, { $pull: { cart: { product_id } } })
                        } else {
                            throw ({
                                status: 404,
                                message: `No such product found in your cart`
                            })
                        }
                    }
                })
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(next)
        }
    }

    static removeFromCart(req, res, next) {
        const userId = req.loggedUser.id
        const { id } = req.params
        // console.log(userId, id);
        if (!id) {
            res.status(400).json({ message: 'bad request' })
        } else {
            User.updateOne({ _id: userId }, { $pull: { cart: { product_id: id } } })
                .then(result => {
                    // console.log(result);
                    res.status(200).json(result)
                })
                .catch(next)
        }
    }

    static viewCart(req, res, next) {
        const user_id = req.loggedUser.id
        User.findById({ _id: user_id })
            .populate('cart.product_id')
            .then(user => {
                res.status(200).json(user.cart)
            })
            .catch(next)
    }

}

module.exports = UserController