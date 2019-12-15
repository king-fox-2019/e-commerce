const Product = require('../models/Product')

class ProductController
{
    static test(req,res)
      {
          res.send('Hello Product Connected')
      }

    static createProduct(req,res,next)
      {
          const createdAt = new Date
          const SellerId = req.decodedUser._id
        //   const imageUrl =
          const { name, price, quantity, imageUrl } = req.body    

          Product.create({
              name, price, quantity, SellerId, imageUrl, createdAt
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })


      }


    static findAll(req,res,next)
      {
          Product.find()
          .populate('SellerId', ' username email -_id')
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static filter(req,res,next)
      {

      }


    static putUpdate(req,res,next)
      {

      }


    static patchUpdate(req,res,next)
      {

      }


    static delete(req,res,next)
      {
        Product.remove({
          _id:req.query.id
        })
        .then(result=>{
          res.status(200).json(`Success to delete ${result.deletedCount}`)
        })
        .catch(err=>{
          next(err)
        })
      }


    static masterDeleteAll(req,res,next)
      {
        Product.remove()
        .then(result=>{
          res.status(200).json(`Success to delete ${result.deletedCount}`)
        })
        .catch(err=>{
          next(err)
        })
      }
}

module.exports = ProductController