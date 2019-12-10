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
        UserModel.find()
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
    }
}