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
    authorizationAdmin(req,res,next){
        User.findOne({
            _id: req.decoded.id
        })
        .then(user => {
            if(user){
                if(user.role == 'admin'){
                    next()
                }else{
                    throw({
                        message: 'You dont have authorization to do action'
                    })
                }
            }else{
                throw({
                    message: 'You dont have authorization to do action'
                })
            }
        })
        .catch(next)
    }
}