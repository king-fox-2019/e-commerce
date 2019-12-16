const UserModel = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

module.exports = {
    register(req, res, next) {
        const { name, email, password, image } = req.body
        UserModel.create({ name, email, password, image })
            .then(user => {
                res.status(201).json({ message : `create user successfuly!`, user })
            })
            .catch(next)
    },
    login(req, res, next) {
        const { email, password } = req.body
        UserModel.findOne({ email })
            .then(user => {
                if (user) {
                    if (comparePassword(password, user.password)) {
                        let payload = { id : user._id }
                        let token = generateToken(payload)
                        res.status(200).json({message : `login successfuly!`, token, user })
                    } else {
                        next({ status: 400, message: 'Email or Password Wrong!' })
                    }
                } else {
                    next({ status: 404, message: 'Email or Password Wrong!' })
                }
            })
            .catch(next)
    },
    findAll(req, res, next) {
        UserModel.find({ role: 'customer' })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    },
    delete(req, res, next) {
        UserModel.findOneAndDelete({
            _id : req.params.id
        })
        .then(user => {
            res.status(200).json({ user, message : 'Delete Success' })
        })
        .catch(next)
    },
    updateRole(req,res,next){
        const { id } = req.params
        UserModel.findOneAndUpdate({ _id : id },{ role : 'admin' }, { new : true, runValidators : true })
            .then(user=>{
                res.status(200).json({
                    message : 'Updated Role Success',
                    user
                })
            })
            .catch(next)
    },
    addmoney(req,res,next){
        const { id } = req.loggedUser
        const { money } = req.body
        UserModel.findOne({ _id : id })
            .then(user=>{
                let calculate = Number(user.money) + Number(money)
                if (calculate < 0) {
                    next({
                        status : 400,
                        message : `add money failed! uang mu akan dibawah 0`
                    })
                } else {
                    return UserModel.findOneAndUpdate({ _id : id }, { money : calculate },{ new: true, runValidators: true }) 
                }
            })
            .then(user=>{
                res.status(200).json({
                    message : `add money success`,
                    user
                })
            })
            .catch(next)
    },
    transferMoney(req,res,next){
        const { money } = req.body
        const { id } = req.params
        UserModel.findOne({ _id : req.loggedUser.id })
            .then(user=>{
                let calculate = Number(user.money) - Math.abs(Number(money))
                if (Number(user.money) < Math.abs(Number(money))) {
                    next({
                        status : 400,
                        message : `transfer money failed! uang mu akan dibawah 0`
                    })
                } else if (calculate < 0) {
                    next({
                        status : 400,
                        message : `tranfer money failed! uang mu akan dibawah 0`
                    })
                } else {
                    return UserModel.findOneAndUpdate({ _id : req.loggedUser.id }, { money : calculate },{ new: true, runValidators: true }) 
                }
            })
            .then(user=>{
                return UserModel.findOne({ _id : id })
            })
            .then(user=>{
                let calt = Number(user.money) + Number(money)
                return UserModel.findOneAndUpdate({ _id : id }, { money : calt },{ new: true, runValidators: true }) 
            })
            .then(user=>{
                res.status(200).json({
                    message : `transfer money success to : ${user.name}`,
                    user
                })
            })
            .catch(next)
    },
    getLogin(req,res,next){
        const { email } = req.params
        UserModel.findOne({ email })
            .then(account=>{
                res.status(200).json({
                    message : 'account has found!',
                    account
                })
            })
            .catch(next)
    }
}