const express = require('express')
const router = express.Router()
const ProductCtrl = require('../controllers/ProductCtrl')
const imageUpload = require('../helpers/imageUpload')

// gcs-upload cannot read property originalname of undefined

router.get('/', ProductCtrl.getAll)
router.get('/:id', ProductCtrl.getOne)
router.post('/', ProductCtrl.create)
// router.patch('/', ProductCtrl.updateImage)
router.put('/:id', ProductCtrl.update)
router.delete('/:id', ProductCtrl.delete)

module.exports = router