const Stock = require('../models/stock')
const Product = require('../models/product')

class StockController {


    static addStock (req,res,next){
        Stock.create({
            productId : req.params.id,
            number : req.body.number,
            stock : req.body.stock
        })
            .then(stock => {
                
                return Product.findByIdAndUpdate(req.params.id,{
                    $addToSet: { stock : stock._id }
                })
            })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                next(err)
            })
    }

    static findByProduct(req,res,next){
        Stock.find({
            productId : req.params.id
        })
        .populate({
            path:'productId',
            // select: { 'name':1}
        })
            .then(stock => {
                res.status(200).json(stock)
            })
            .catch(err => {
                next(err)
            })
    }
    
    static update (req,res,next){

        const {stock} = req.body
        if(!stock ){
            throw {
                status : 400,
                message : 'please insert number / stock'
            }
        }
        Stock.findOneAndUpdate({
            productId : req.params.id, number : req.params.size },{ stock : stock },{ new: true })
            .then (product => {
                res.status(201).json(product)
            })
            .catch(err => {
                next(err)
            })
    }

    static delete (req,res,next){
        Stock.findOneAndDelete({
            productId : req.params.id,
        })
            .then(stock => {
                return Product.findByIdAndUpdate(req.params.id,{
                    $pull: { stock : stock._id }
                })
            })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                next(err)
            })
    }
}
module.exports = StockController