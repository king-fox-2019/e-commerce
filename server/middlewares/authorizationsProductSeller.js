const Product = require('../models/Product')

module.exports = (req,res,next)=>{
    console.log('AUTHORIZATION PRODUCT SELLER IS RUNNING')

    Product.findById( req.query.id )
    .then(result=>{
        if(String(result.SellerId) === String(req.decodedUser._id))
          {
              next()
          }
        else
          {
              throw({ code:403, message:'un-Authorized User'})
          }
    })
    .catch(err=>{
        next({code:404, message:'Item not Found'})
    })




}