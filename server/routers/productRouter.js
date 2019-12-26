const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentications')
const authorization = require('../middlewares/authorizationsProductSeller')

router.get('/test', ProductController.test)
// USE WITH CAUTION
router.delete('/masterDeleteAllForTdd', ProductController.masterDeleteAll )


router.get('/', ProductController.findAll)
router.get('/?', ProductController.filter)



router.use(authentication('seller'))
router.post('/', ProductController.createProduct)

router.use(authorization)
router.put('/?', ProductController.putUpdate)
router.patch('/?', ProductController.patchUpdate)
router.delete('/?', ProductController.delete)


module.exports = router