const routes = require('express').Router()
const cartController = require('../controllers/cart')
const {  authentication ,authorizationCart, authorizationAdmin } = require('../middlewares/auth')

routes.use(authentication)
routes.get('/', cartController.findAll) //FINDALL
routes.get('/:status', cartController.findStatus) //find
routes.get('/:id/stock', cartController.findOneStock)
routes.get('/:status/admin', authorizationAdmin, cartController.findStatusByAdmin)
routes.post('/:id/cart', cartController.create) //CREATED
routes.patch('/:id', authorizationCart ,cartController.update) //update
routes.patch('/:id/status', authorizationCart ,cartController.updateStatus) //update
routes.patch('/:id/status/admin', authorizationAdmin, cartController.updateStatus) //update
routes.delete('/:id', cartController.delete) //CREATED

module.exports = routes