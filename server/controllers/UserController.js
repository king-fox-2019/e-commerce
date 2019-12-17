const User = require("../models/user");
const jwt = require("../helpers/jwt.js");
const bcryptjs = require("../helpers/bcryptjs.js");

class UserController {
    
    static login(req, res, next) {
        console.log('login invoked')
        console.log('req.body => ',req.body);

        if(!req.body.email || !req.body.password) {
            throw new Error('Email/password is required')
        }

        User.findOne({email: req.body.email})
        .then(( result ) => {
            if(!result) {
                throw new Error("Email is not registered !")
            } else {
                console.log('result => ',result);
                let token = jwt.createToken({
                    _id: result._id,
                    email: result.email
                })
                if(bcryptjs.validatePassword(req.body.password,result.password)){
                    res.status(200).json(composeReturn(token, result))
                } else {
                    throw new Error("Password is Invalid !")
                }
            }
        })
        .catch(next)
    }

    static createSuperAdmin(req, res, next) {
        console.log('createSuperAdmin invoked')
        console.log('req.body => ',req.body);
        
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: "SuperAdmin"
        }

        User.create(user)
            .then(( result ) => {
                console.log('result => ',result);
                res.status(201).json(result);
            })
            .catch(next)
    }

    static inviteAdmin(req, res, next) {
        console.log('inviteAdmin invoked');
        console.log('req.body => ',req.body);

        let user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: "admin"
        }

        User.create(user)
            .then(( result ) => {
                console.log('result => ',result);
                res.status(201).json(result);
            })
            .catch(next)
    }

    static register(req, res, next) {
        if(!req.body.name || !req.body.email || !req.body.password) {
            throw new Error('Email/password is required')
        }

        console.log('req.body => ',req.body);

        let body = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            balance:0
        }

        User.create(body)
            .then(( result ) => {
                console.log('result => ',result);
                let token = jwt.createToken({
                    _id: result._id,
                    email: result.email
                })
                res.status(201).json(composeReturn(token, result))
            })
            .catch(next)
    }

    static getUser(req, res, next){
        console.log('getUser')
        console.log('req.body.user => ',req.body.user);

        User.find({ _id: req.body.user._id })
            .then(( result ) => {
                console.log('result => ',result);
                res.status(200).json({
                    imageUrl: result[0].imageUrl,
                    accountType: result[0].accountType,
                    name: result[0].name,
                    balance: result[0].balance,
                    role: result[0].role
                })
            })
            .catch(next)
    }

    static update(req,res,next){
       
            let updateVal = {};
            req.file && (updateVal.imageUrl = req.file.cloudStoragePublicUrl) 
            req.body.balance && (updateVal.balance = req.body.balance);

            User.findByIdAndUpdate(req.params.user._id,updateVal,{new:true})
                .then(( result ) => {
                    res.status(200).json(result);
                })
                .catch(next)
    }
}

function composeReturn(token, result) {
    return {
        token:token,
        name: result.name,
        imageUrl: result.imageUrl,
        role: result.role,
        balance: result.balance
    }
}
module.exports = UserController;