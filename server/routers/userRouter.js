const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/test', UserController.test)
// USE WITH CAUTION
router.delete('/masterDeleteAll', UserController.masterDeleteAll)



router.get('/', UserController.findAll)

router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.post('/gsignin', UserController.gSignIn)



module.exports = router