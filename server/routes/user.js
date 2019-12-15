const express = require('express')
const User = express.Router()
const UserCon = require('../controllers/UserCon')

//userRegister
User.post('/register',UserCon.register)

//userLogin
User.post('/login', UserCon.login)

module.exports = User




