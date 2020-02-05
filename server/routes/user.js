const routes = require('express').Router()
const userController = require('../controllers/user')
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

routes.get('/', authentication, authorization, userController.findAll) //FINDALL
routes.get('/logged/:email', userController.getLogin)
routes.post('/login', userController.login) //LOGIN
routes.post('/register', uploadUnggah.array('image'), userController.register) //REGISTER
routes.use(authentication)
routes.patch('/:id',userController.updateRole) //updateRole
routes.patch('/money/topup', userController.addmoney)//addmoney
routes.patch('/money/:id/transfer', userController.transferMoney)//addmoney
routes.delete('/:id', authorization, userController.delete)//Delete

module.exports = routes