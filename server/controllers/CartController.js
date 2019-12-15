const Cart = require('../models/Cart')
const Product = require('../models/Product')

class CartController
{
    static test(req,res)
      {
          res.send('Hello Cart Connected')
      }


    static create(req,res,next)
      {
        // console.log('TCL \n============\n ', req.body)
        const BuyerId = req.decodedUser._id
        const { ProductId, quantity } = req.body
        const createdAt = new Date()

        console.log("TCL: quantity", quantity)
        console.log('TCL \n============\n ', typeof(quantity))

        Cart.create({
          BuyerId, ProductId, quantity, isComplete:false, createdAt
        })
        .then(result =>{
          res.status(200).json(result)
        })
        .catch(err =>{
          next(err)
        })
      }


    static viewCartByUser(req,res,next)
      {
        const BuyerId = req.decodedUser._id

        Cart.find(
          { BuyerId, isComplete:false }
        )
        .populate('BuyerId', 'username email')
        .populate({
          path: "ProductId",
          populate: {
            path: 'SellerId',
            select: 'username email -_id'
          }
        })
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          next(err)
        })
      }



    static putUpdate(req,res,next)
      {
        const { quantity, isComplete } = req.body

        Cart.update(
          { _id:req.query.id},
          { quantity, isComplete }
        )
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>[
          next(err)
        ])
        
      }


    static patchUpdate(req,res,next)
      {

        const keys = Object.keys(req.body)
        const values = Object.values(req.body)
        let query = {}

        for (let x = 0; x < keys.length; x++)
          {
            query[keys[x]] = values[x]
          }
        console.log('TCL \n============\n query', query)

        Cart.update(
          { _id:req.query.id },
          query
        )
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          next(err)
        })
      }
    

    static delete(req,res,next)
      {
        Cart.remove(
          { _id:req.query.id}
        )
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          next(err)
        })
      }


    static masterDeleteAll(req,res,next)
      {
        Cart.remove()
        .then(result=>{
          res.send(200).json(result)
        })
        .catch(err=>{
          next(err)
        })
      }

}


module.exports = CartController