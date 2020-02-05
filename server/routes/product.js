const routes = require('express').Router()
const productController = require('../controllers/product')
const {  authentication ,authorization } = require('../middlewares/auth')

const unggah = require('unggah')
const storageConfig = unggah.gcs({
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE, // this can also be set using GOOGLE_APPLICATION_CREDENTIALS environment variable
    bucketName: process.env.CLOUD_BUCKET,
    rename: (req, file) => {
        return `${Date.now()}-${file.originalname}`;
    },
});

const uploadUnggah = unggah({
    storage: storageConfig
});

routes.get('/', productController.findAll) //FINDALL
routes.use(authentication)
routes.post('/', authorization, uploadUnggah.array('image') ,productController.create)
routes.post('/create', uploadUnggah.array('image') ,productController.create)
routes.post('/tag', productController.findbytag)
routes.put('/:id', authorization, uploadUnggah.array('image') ,productController.updatePut)
routes.patch('/:id', authorization, productController.updatePatch)
routes.patch('/:id/stock', authorization, productController.updateStockPatch)
routes.patch('/:id/discount', authorization, productController.discountProduct)
routes.delete('/:id', authorization, productController.delete)

module.exports = routes