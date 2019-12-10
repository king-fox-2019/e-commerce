const ProductModel = require('../models/product')
const User = require('../models/user')
module.exports = {
    findAll(req,res,next){
        ProductModel.find()
            .then(products=>{
                res.status(200).json(products)
            })
            .catch(next)
    },
    create(req, res, next) {
        const { id } = req.loggedUser
        const { name, price, image, quantities, tag } = req.body
        ProductModel.create({ name, price, image, quantities, tag , userId : id })
            .then(product => {
                res.status(201).json({ message : `create product successfuly!`, product })
            })
            .catch(next)
    },
    updatePut(req, res, next) {
        const { id } = req.params
        const { name, price, image, quantities, tag } = req.body
        ProductModel.findOneAndUpdate({_id:id},{ name, price, image, quantities, tag },{ new : true, runValidators : true })
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
        ProductModel.findOneAndUpdate({_id:id},{ discount },{ new : true, runValidators : true })
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
    }
}