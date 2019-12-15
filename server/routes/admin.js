const admin = require('express').Router()
const {
  AdminController,
  ItemController,
  TransactionController
} = require('../controllers')
const { authorizeAdmin } = require('../middlewares/auth')
const upload = require('gcs-upload')({
  gcsConfig: {
    keyFilename: process.env.GCS_KEYFILE_PATH,
    bucketName: process.env.GCS_BUCKET_NAME
  }
})

admin.post('/signup', AdminController.superAdminSignUp)
admin.post('/signin', AdminController.adminSignIn)

admin.use(authorizeAdmin)
admin.post('/image', upload.single('image'), AdminController.imageHandler)
admin.get('/items', ItemController.getAllItems)
admin.post('/items', ItemController.createNewItem)
admin.get('/items/:id', ItemController.getOneItem)
admin.patch('/items/:id', ItemController.updateItem)
admin.get('/transactions', TransactionController.getAllTransactions)
admin.get(
  'user/:id/transactions',
  TransactionController.getAdminAllUserTransactions
)
admin.get('/transactions/:id', TransactionController.getOneTransaction)
admin.patch('/transactions/:id', TransactionController.updateTransactionStatus)

module.exports = admin
