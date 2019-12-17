const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const {authentication} = require('../middlewares/authentication')

const authorization = (req,res,next)=>{
    // console.log(req.loggedUser)
    if(req.loggedUser.role === 'admin'){
        next()
    }else{
        next({
            status : 401,
            message : 'unauthorized user'
        })
    }
}

router.get('/cities',transactionController.getCities)
router.post('/getCost',transactionController.getCityId)
router.post('/cityDetails',transactionController.getCityInProvince)
router.get('/confirm/:transactionId',transactionController.confirmReceived)
router.use(authentication)
router.get('/all',authorization,transactionController.getAllTransaction)
router.post('/mail',authorization,transactionController.emailConfirmation)
router.delete('/:id',transactionController.deleteTransaction)
router.get('/',transactionController.showTransaction)
router.post('/checkout',transactionController.checkOut)
router.get('/done',transactionController.finishedTransaction)
router.get('/cart',transactionController.cart)



module.exports = router