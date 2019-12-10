const routes = require('express').Router()
const user = require('./user')
const product = require('./product')
const cart = require('./cart')

routes.get('/',(req,res,next)=>{
    res.status(200).json('Thank you, you`re have access to this rest-api : anggabanny')
})

routes.use('/user',user)
routes.use('/product',product)
routes.use('/cart',cart)

module.exports = routes