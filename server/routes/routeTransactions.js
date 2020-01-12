const router = require('express').Router()
const ControllerTransaction = require('../controllers/transaction')

const checkObjectIdValidity = require('../middlewares/checkObjectIdValidity')
const authenticate = require('../middlewares/authenticate')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeUserTransaction = require('../middlewares/authorizeUserTransaction')

router.get('/', authenticate, authorizeAdmin, ControllerTransaction.fetchAll)

router.get(
  '/user', authenticate, ControllerTransaction.fetchUserTransactions
)

router.get(
  '/:id',
  checkObjectIdValidity,
  authenticate,
  authorizeUserTransaction,
  ControllerTransaction.fetchOne
)

router.patch(
  '/:id',
  checkObjectIdValidity,
  authenticate,
  authorizeAdmin,
  ControllerTransaction.updateStatus
)

router.patch(
  '/:id/received',
  checkObjectIdValidity,
  authenticate,
  authorizeUserTransaction,
  ControllerTransaction.confirmReceived
)

module.exports = router