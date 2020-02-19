const ProductModel = require('../models/product')
const User = require('../models/user')
const Stock = require('../models/stock')
module.exports = {
    findAll(req,res,next){
        ProductModel.find()
            .populate('size')
            .then(products=>{
                res.status(200).json(products)
            })
            .catch(next)
    },
    create(req, res, next) {
        const { name, size, price, stock, image } = req.body
        let stck;
        Stock.create({ size, stock })
            .then(stock => {
                stck = stock._id
                return ProductModel.create({ name, image, price})
            })
            .then(product=>{
                return ProductModel.findOneAndUpdate({ _id : product._id },{ $addToSet : { size : stck }},{ new: true, runValidators: true })
            })
            .then(product=>{
                res.status(201).json({ message : `create product successfuly!`, product })
            })
            .catch(next)
    },
    updateStockPatch(req,res,next){
        let { stock} = req.body
        let { id } = req.params
        console.log(stock);
        
        Stock.findOneAndUpdate({ _id:id },{ stock }, { new: true, runValidators: true })
            .then(stock=>{
                res.status(200).json(stock)
            })
            .catch(next)
    },
    updatePut(req, res, next) {
        const { id } = req.params
        const { name, price, image } = req.body
        ProductModel.findOneAndUpdate({_id:id},{ name, price, image },{ new : true, runValidators : true })
            .then(product => {
                res.status(200).json({ message : `updated product successfuly!`, product })
            })
            .catch(next)
    },
    updatePatch(req, res, next) {
        const { id } = req.params
        const { price } = req.body
        ProductModel.findOneAndUpdate({_id:id},{ price },{ new : true, runValidators : true })
            .then(product => {
                res.status(200).json({ message : `updated product price successfuly!`, product })
            })
            .catch(next)
    },
    discountProduct(req, res, next) {
        const { id } = req.params
        const { discount } = req.body
        let discountPercent = discount+'%'
        ProductModel.findOneAndUpdate({_id:id},{ discount, discountPercent },{ new : true, runValidators : true })
            .then(product => {
                res.status(200).json({ message : `updated product discount successfuly!`, product })
            })
            .catch(next)
    },
    delete(req,res,next){
        const { id } = req.params
        ProductModel.findOneAndDelete({ _id : id })
            .then(product=>{
                res.status(200).json({
                    message : `delete product succesfully`,
                    product
                })
            })
            .catch(next)
    },
    findbytag(req,res,next){
        const { tag } = req.body
        ProductModel.findAll({ tag })
            .then(products=>{
                res.status(200).json({
                    message : `success find product in tag : ${tag}`,
                    products
                })
            })
            .catch(next)
    }
}