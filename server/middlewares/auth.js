const { verifyToken } = require('../helpers/jwt')
const UserModel = require('../models/user')
const CartModel = require('../models/cart')

function authentication(req, res, next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        UserModel.findOne({ _id : decodedToken.id })
            .then(user => {
                if(user){
                    req.loggedUser = decodedToken
                    next()
                }
                else{
                    next({
                        status: 401,
                        message: 'Unauthorized'
                    })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ 
            status: 401,
            message: err 
        })
    }
}

function authorization(req, res, next){
    UserModel.findOne({ _id : req.loggedUser.id })
        .then(result => {
            if(result.role == 'admin'){
                next()
            }
            else{
                next({ 
                    status: 401, 
                    message: 'Unauthorized, Not Admin!'
                })
            }
        })
        .catch(next)
}

function authorizationCart(req,re,next) {
    CartModel.findOne({ _id : req.params.id })
        .then(cart=>{
            if (cart.userId == req.loggedUser.id) {
                next()
            } else {
                next({ 
                    status: 401, 
                    message: 'Unauthorized!'
                })
            }
        })
        .catch(next)
}

function authorizationAdmin(req,re,next) {
    UserModel.findOne({ _id : req.loggedUser.id })
        .then(user=>{
            if (user.role == 'admin') {
                next()
            } else {
                next({ 
                    status: 401,
                    message: 'Unauthorized!'
                })
            }
        })
        .catch(next)
}

module.exports = {
    authentication,
    authorization,
    authorizationCart,
    authorizationAdmin
}