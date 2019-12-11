const express = require('express')
const router = express.Router()

const userRoute = require('./userR')
const productRoute = require('./productR')

router.use('/users', userRoute)
router.use('/products', productRoute)

module.exports = router