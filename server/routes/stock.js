const StockController = require('../controllers/stockController')

const router = require('express').Router()

router.post('/:id', StockController.addStock)
router.get('/:id', StockController.findByProduct)
router.put('/:id/:size', StockController.update)
router.delete('/:id', StockController.delete)

module.exports = router