//models
const User = require('../models/user')

//token & commpare password
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')


class UserCon {
    static  register(req,res,next){
        User.create(req.body)
            .then(user=>{
                let token = generateToken(user)  
                let {email,_id,name} = user
                res.status(200).json({
                    message : 'login succesfully',
                    token : token,
                    user : {
                        email,
                        _id,
                        name
                    }                        
                })
            })
            .catch(next)
    }
    static login(req,res,next){
        User.findOne({ 
            email : req.body.email
        })
        .then(user => {            
            if (user) { 
                if ( comparePassword(req.body.password, user.password)  ) {               
                    let token = generateToken(user)  
                    let {email,_id,name} = user
                    res.status(200).json({
                        message : 'login succesfully',
                        token : token,
                        user : {
                            email,
                            _id,
                            name
                        }                        
                    })
                } else {                    
                    next({
                        status: 403,
                        message: 'Wrong Password'
                    })
                }
            } else {
                next({
                    status : 404,
                    message : 'user not found'
                })
            } 
        })
        .catch(next)
    }
}

module.exports = UserCon