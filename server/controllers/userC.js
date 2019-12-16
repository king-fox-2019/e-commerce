`use strict`

const User = require('../models/user')
const { hash, deHash } = require('../helpers/bcrypt')
const { genToken } = require('../helpers/jwt')

class Controller {

    static findAllUser(req, res, next) {
        User.find()
            .then((users) => {
                res.status(200).json(users)
            })
            .catch(next);
    }

    static login(req, res, next) {
        // console.log(req.body);
        if (!req.body.email || !req.body.password) {
            next({ status: 400, msg: 'Please gimme your email and password' })
        }
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) next({ status: 404, msg: "User not found" })
                else {
                    let userPassword = deHash(req.body.password, user.password)
                    if (userPassword) {
                        let token = genToken({ id: user._id, name: user.name })
                        res.status(200).json({ token, user })
                    } else {
                        next({ status: 403, msg: "Incorrect Password" })
                    }
                }
            })
            .catch(next);
    }

    static register(req, res, next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: req.body.password
        })
            .then((user) => {
                let token = genToken({ id: user._id, name: user.name })
                res.status(200).json({ token, user })
            })
            .catch(next);
    }

    static showCart(req, res, next) {
        console.log('show cart');
        User
            .findById(req.decode.id)
            .populate('cart')

            .then((user) => {
                res.status(200).json(user.cart)
            }).catch(next);
    }

    static addCart(req, res, next) {
        console.log(req.params);
        User.findById(req.decode.id)
            .then((user) => {
                if (user.cart.indexOf(req.params.id) == -1) {
                    return User.findByIdAndUpdate(req.decode.id, {
                        $push: { cart: req.params.id }
                    })
                } else {
                    res.status(200).json({ cart: user.cart })
                }
            })
            .then((user) => {
                res.status(200).json({ cart: user.cart })
            })
            .catch(next);
    }

    static removeCart(req, res, next) {
        User
            .findByIdAndUpdate(req.decode.id, {
                $pull: { cart: req.params.id }
            })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next);
    }
}

module.exports = Controller