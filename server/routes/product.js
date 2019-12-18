const routes = require('express').Router()
const productController = require('../controllers/product')
const gcsUpload = require('gcs-upload')
const {  authentication ,authorization } = require('../middlewares/auth')

const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: "keyfile.json",
        bucketName: "image-bucket-ecommerce-sportstation"
    }
})

routes.get('/', productController.findAll) //FINDALL
routes.use(authentication)
routes.post('/', authorization, upload.array('image') ,productController.create)
routes.post('/create', upload.array('image') ,productController.create)
routes.post('/tag', productController.findbytag)
routes.put('/:id', authorization, upload.array('image') ,productController.updatePut)
routes.patch('/:id', authorization, productController.updatePatch)
routes.patch('/:id/stock', authorization, productController.updateStockPatch)
routes.patch('/:id/discount', authorization, productController.discountProduct)
routes.delete('/:id', authorization, productController.delete)

module.exports = routes