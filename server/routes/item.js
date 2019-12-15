const router = require('express').Router()
const ItemController = require('../controllers/item')
const {authentication} = require('../middlewares/auth')

router.get('/', ItemController.readAll)





module.exports = router