const router = require('express').Router()
const productController = require('../controllers/productController')
const gcsUpload = require('gcs-upload')
const {authentication} = require('../middlewares/authentication')
const transactionController = require('../controllers/transactionController')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: './Nike-store-03a37306c248.json',
      bucketName: 'nike-public-bucket'
    }
  })


  const authorization = (req,res,next)=>{
      if(req.loggedUser.role === 'admin'){
          next()
      }else{
          next({
              status : 401,
              message : 'unauthorized user'
          })
      }
  }


router.get('/',productController.showAll)
router.get('/:id',productController.findOne)
router.use(authentication)
router.post('/:id',transactionController.addToCart)
router.use('/',authorization)
router.post('/',upload.array('images'),productController.create)
router.delete('/:id',productController.delete)
router.put('/:id',upload.array('images'),productController.update)


module.exports = router