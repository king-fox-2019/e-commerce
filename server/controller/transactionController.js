const Transaction = require("../models/transaction")
const { verifyToken } = require('../helpers/jwt')

class transactionController {
    static getTransactions = (req,res,next) => {
        if(req.query.user){
            let decoded = verifyToken(req.headers.access_token)
            Transaction.find({userId:decoded.id})
            .then(transactions=>res.status(200).json(transactions))
        }else{
            Transaction.find({})
            .then(transactions=>{
                res.status(200).json(transactions)
            })
            .catch(next)
        }
    }
    static doneTransactions = (req,res,next) => {
        let decoded = verifyToken(req.headers.access_token)
        Transaction.updateOne({
            productId:req.body.productId,
            quantity:req.body.quantity,
            userId:decoded.id
        },{
            $set:{status:'done'}
        })
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(next)
    }
}

module.exports = transactionController