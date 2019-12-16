const routes = require('express').Router()
const userController = require('../controllers/user')
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

routes.get('/', authentication, authorization, userController.findAll) //FINDALL
routes.get('/logged/:email', userController.getLogin)
routes.post('/login', userController.login) //LOGIN
routes.post('/register', upload.array('image') ,userController.register) //REGISTER
routes.use(authentication)
routes.patch('/money/topup', userController.addmoney)//addmoney
routes.patch('/:id',userController.updateRole) //updateRole
routes.patch('/money/:id/transfer', userController.transferMoney)//addmoney
routes.delete('/:id', authorization, userController.delete) //Delete

module.exports = routes