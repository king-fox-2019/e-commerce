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
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) next({ status: 404, msg: "User not found" })
                else {
                    let userPassword = deHash(req.body.password, user.password)
                    if (userPassword) {
                        let token = genToken({ id: user._id, name: user.name })
                        res.status(200).json({ token })
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
                res.status(200).json({ token })
            })
            .catch(next);
    }

    static showCart(req, res, next) {
        User
            .findById(req.decode.id)
            .populate('cart')

            .then((carts) => {
                res.status(200).json(carts)
            }).catch(next);
    }

    // static showPoduct(req, res, next){
    //     User
    //         .
    // }
}

module.exports = Controller