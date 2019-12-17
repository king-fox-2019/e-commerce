const User = require('../models/user')
const verifyPassword = require('../helpers/passwordGenerator').verifyPassword
const tokenGenerator = require('../helpers/tokenGenerator').generateToken
const Product = require('../models/product')

class UserController {
    static register(req,res,next){
        console.log(req.body,'register triggered')
        User.create({
            fullname : req.body.fullname,
            email : req.body.email,
            password : req.body.password,
            role : req.body.role,
        })
        .then( user => {
            let payloads = {
                id : user._id,
            }
            let token = tokenGenerator(payloads)
            res.status(201).json({ access_token : token, role : user.role })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static signIn(req,res,next){
        User.findOne({
            email : req.body.email
        })
        .then(user => {
            if(user){
                if(verifyPassword(req.body.password, user.password)){
                    let payloads = {
                        id : user._id,
                    }
                    let token = tokenGenerator(payloads)
                    res.status(200).json({ access_token : token, role : user.role})
                }else{
                    res.status(401).json({
                        status : 401,
                        message : "wrong email/password"
                    })
                }
            }else{
                res.status(401).json({
                    status : 401,
                    message : "wrong email/password"
                })
            }
        })
        .catch(err =>{
          next(err)
        })
    }
}

module.exports = UserController