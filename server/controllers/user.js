const User = require('../models/user')
const { generateToken,verifyToken } = require('../helpers/jwt')
const { hash,compare } = require('../helpers/password')

class UserController {
    static registerUser(req,res,next){
        const { username,email,password,role } = req.body
        User.create({
            username,
            email,
            password,
            role
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(next)
    }

    static loginUser(req,res,next){
        const { email,password } = req.body
        User.findOne({
            email
        })
        .then(user => {
            if(user){
                let valid = compare(password, user.password)
                if(valid){
                    let token = generateToken({id: user._id})
                    res.status(200).json({
                        user,token
                    })
                }else{
                    throw({
                        status: 400,
                        message: 'Your password is wrong'
                    })
                }
            }else{
                throw({
                    status: 400,
                    message: 'Your email is not registered'
                })
            }
        })
        .catch(next)
    }

    static getUserInfo(req,res,next){
        User.findOne({
            _id: req.decoded.id
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
    }

    static editProfile(req,res,next){
        let form = req.body
        let input = {}
        for(let data in form){
            input[data] = form[data]
        }
        User.findOneAndUpdate({
            _id: req.decoded.id
        },input,
        {
            new: true
        })
        .then(user => {
            res.status(200).json(user)
        })  
        .catch(next)
    }
}

module.exports = UserController