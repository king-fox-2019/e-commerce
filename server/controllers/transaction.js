const Transaction = require('../models/Transaction')
const { dateNow } = require('../helpers/dateNow')
class TransactionController{
    static addTransaction(req, res, next){
        const { shopList, total } = req.body
        const date = dateNow()
        const user = req.id
        const status = 'on process'
        Transaction.create({date, shopList, user, status, total})
            .then( trans => {
                res.status(200).json(trans)
            })
            .catch(next)
    }
    static changeStatus(req, res, next){
        const { status } = req.body
        const _id = req.params.id
        Transaction.updateOne({ _id }, { status })
            .then(trans => {
                res.status(200).json(trans)
            })
            .catch(next)
    }
    static deleteTransaction(req, res, next){
        const _id = req.params.id
        Transaction.deleteOne({ _id })
            .then(()=> {
                res.status(200).json({message : 'transaction deleted'})
            })
            .catch(next)
    }
    static getUserTransaction(req, res, next){
        const user = req.id
        Transaction.find({user}).populate('shopList.product').sort({ _id : -1})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static getAllTransaction(req, res, next){
        Transaction.find().populate('shopList.product').populate('user').sort({ _id : -1})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}
module.exports = TransactionController