const router = require('express').Router()
const {singleUpload} = require('../services/fileUpload')
const errorHandler = require('../middlewares/errorHandler')
const buyerRoutes = require('./buyer')
const itemRoutes = require('./item')
const Item = require('../models/Item')

router.post('/ceritanyaEndpointRahasiaAddItem', function(req, res, next) {

   Item
   .create(req.body)
   .then(item => {
      res.status(201).json({message: 'item creation success', item})
   })
   .catch(next)
})

router.patch('/secretEndpointUpdateItem/:id', (req, res, next) => {

   Item
   .updateOne({_id: req.params.id}, {$set: req.body})
   .then(() => {
      res.status(200).json({message: 'update success'})
   })
   .catch(next)
})

router.use('/buyer', buyerRoutes)
router.use('/item', itemRoutes)


router.use(errorHandler)

module.exports = router