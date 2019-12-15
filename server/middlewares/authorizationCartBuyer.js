const Cart = require('../models/Cart')



module.exports = (req,res,next)=>{
    console.log('AUTHORIZATION CART BUYER IS RUNNING')
    console.log('TCL \n============\n ', 'masuk sini authorizationbuye')
    console.log('TCL \n============\n req.decodedUser', req.decodedUser )
    console.log('TCL \n============\n req query', req.query)



    Cart.findOne(
        { _id: req.query.id }
    )
    .then(result=>{
        console.log('TCL \n============\n result', result)
        if( String(result.BuyerId) === String(req.decodedUser._id) )
          { 
              console.log('TCL \n============\n ', 'sama nihhhhhh')
              next()
          }
        else
          {
              throw({ code:403, message:'un-Authorized User'})
          }
    })
    .catch(err=>{
        next(err)
    })

}