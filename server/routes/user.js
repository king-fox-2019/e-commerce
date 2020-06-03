'use strict'

const express = require('express')
const router = express.Router()
const { User } = require('../controllers')

router.post('/register', User.register)
router.post('/login', User.login)
router.post('/googleAuth', User.googleAuth)

module.exports = router