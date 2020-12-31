const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transactionController')

router.get('/',transactionController.getTransactions)
router.put('/',transactionController.doneTransactions)

module.exports = router