const gcsUpload = require('gcs-upload')
const router = require('express').Router()
const ControllerProduct = require('../controllers/product')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authenticate = require('../middlewares/authenticate')

const upload = gcsUpload({
  limits: {
    fileSize: Infinity // in bytes
  },
  gcsConfig: {
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
    bucketName: process.env.GOOGLE_CLOUD_BUCKET
  }
})

router.post('/upload-image', authenticate, upload.single('image'), (req, res, next) => {
  res.status(200).send(req.body.image)
})

router.get('/', ControllerProduct.fetchAll)

router.post('/', authenticate, authorizeAdmin, ControllerProduct.add)

router.get('/:id', ControllerProduct.fetchOne)

router.patch('/:id', authenticate, authorizeAdmin, ControllerProduct.update)

router.delete('/:id', authenticate, authorizeAdmin, ControllerProduct.delete)

module.exports = router
