//models
const Item = require('../models/item')

class ItemCon {
    static  create(req,res,next){
        Item.create(req.body)
            .then(item => {
                res.status(201).json(item)
            })
            .catch(next)
    }
    static findAll(req,res,next){
        Item.find()
        .then(data => {            
            res.status(200).json(data)
        })
        .catch(next)
    }
    static findOne(req,res,next){
        Item.findOne({_id : req.params.id})
        .then(item => {
                res.status(200).json(item)
        })
        .catch(next)
    }
    static remove(req,res,next){
        Item.deleteOne({ _id : req.params.id})
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(next)
    }
    static update(req,res,next){
        Item.updateOne({_id:req.params.id},req.body)
        .then(respone=>{
            res.status(200).json(respone)
        })
        .catch(next)
    }
}

module.exports = ItemCon