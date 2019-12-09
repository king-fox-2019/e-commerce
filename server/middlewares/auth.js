const User = require('../models/user')
const { verifyToken } = require('../helpers/jwt')

module.exports = {
    authenticate(req,res,next){
        try{
            let decoded = verifyToken(req.headers.access_token)
            req.decoded = decoded
            next()
        }catch(err){
            next(err)
        }
    },
    authorizationProduct(req,res,next){
        
    },
    authorizationTransaction(req,res,next){

    }
}