`use strict`

const { verify } = require('../helpers/jwt')
const User = require('../models/user')
const Product = require('../models/product')


function authenticating(req, res, next) {
    // console.log(req.params);
    try {
        req.decode = verify(req.headers.access_token)
        console.log(req.decode);
        User.findById(req.decode.id)
            .then((user) => {
                if (!user) {
                    throw ({
                        status: 404,
                        msg: 'User undefined/not registered'
                    })
                } else {
                    next()
                }
            })
            .catch(next);
    } catch (error) {
        next({status:401, msg: "Unathorized"})
    }
}

function authorizating(req, res, next) {
    console.log('masuk autho');
    authenticating(req, res, next)
    try {
        console.log('masuk try', req.params);
        // req.decode = verify(req.headers.access_token)
        Product.findById(req.params.id)
            .then((product) => {
                console.log(req.params);
                if (!product) {
                    next ({ status: 404, msg: 'Product not found' })
                } else if (product.owner != req.decode.id) {
                    next ({ status: 403, msg: "This product not belongs to you, sir!!" })
                } else {
                    next()
                }
            })
            .catch(next);
    } catch (error) {
        next({status: 500, msg: "Something went wrong"})
    }
}


module.exports = {
    authenticating,
    authorizating
}