const router = require('express').Router()
const itemRoute = require('./itemRoute')
const userRoute = require('./userRoute')

router.use('/item', itemRoute)
router.use('/user', userRoute)

module.exports = router