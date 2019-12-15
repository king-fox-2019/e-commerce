const router = require('express').Router()
const {singleUpload} = require('../services/fileUpload')
const errorHandler = require('../middlewares/errorHandler')
const buyerRoutes = require('./buyer')
const itemRoutes = require('./item')
const Item = require('../models/Item')

router.post('/imgUpload', function(req, res) {
   singleUpload(req, res, function(err) {
      if(err) {
         console.error(err)
         res.status(500).json({message: err.message})
      }
      else res.status(201).json({image: req.file.location})
   })
})

router.post('/ceritanyaEndpointRahasiaAddItem', function(req, res, next) {

   Item
   .create(req.body)
   .then(item => {
      res.status(201).json({message: 'item creation success', item})
   })
   .catch(next)
})

router.use('/buyer', buyerRoutes)
router.use('/item', itemRoutes)


router.use(errorHandler)

module.exports = router