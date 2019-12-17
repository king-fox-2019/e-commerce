const jwt = require("../helpers/jwt.js");
const User = require("../models/user.js");
const Cart = require("../models/cart.js");

module.exports = {
    authentication : function(req, res, next){
        try {
            console.log('authentication invoked()')
            console.log('req.headers.authorization => ',req.headers.authorization);
            let user = jwt.decodeToken(req.headers.authorization)
            User.findOne({_id:user._id})
            .then(( result ) => {
                if(result) {
                    req.body.user = result;
                    req.params.user = result;                   
                    next()
                } else {
                    console.log('17')
                    throw new Error("User not found")
                }
            })
        } catch(err) {
            next(err)
        }
    },
    authorization : function(req, res, next) {
        let loginUser = req.body.user || req.params.user || null
    },
    superAdminOnly: function(req, res, next) {
        console.log('superAdminOnly');
        let loginUser = req.body.user || req.params.user || null

        console.log('loginUser => ',loginUser);
        console.log('loginUser.role => ',loginUser.role);

        if(loginUser && loginUser.role === "SuperAdmin") {
            console.log('36')
            next()
        } else {
            console.log('39')
            next(new Error("Not Authorized as SuperAdmin"))
        }
    },
    adminOnly: function(req, res, next) {
        let loginUser = req.body.user || req.params.user || null

        if(loginUser && loginUser.role === "admin") {
            next()
        } else {
            next(new Error("Not Authorized as Admin"))
        }
    },
    customerOnly: function(req, res, next) {
        console.log('req.params.user._id => ',req.params.user._id);
        let loginUser = req.body.user || req.params.user || null
       
        if(loginUser && loginUser.role === "customer") {
            next()
        }else{
            next(new Error("Not Authorized"))
        }
        
    },
    cartAuth: function(req, res, next){
        let loginUser = req.body.user ? req.params.user:null

        Cart.findOne({_id:req.params.cartId})
            .then(( result ) => {
                if(result){
                    result.userId == loginUser._id ? next():next(new Error("Not Authorized"))
                } else {
                    throw new Error("Item id not found")
                }
       
            })
            .catch(( err ) => {
                next(err)
            })
    }

}