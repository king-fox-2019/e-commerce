const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')


module.exports = function(role) {
    return function(req,res,next){
        console.log(`AUTHENTICATION ${role} IS RUNNING`)
        
        if (!req.headers.access_token)
          next({ code:403, message:'Failed to satisfied requirement'})

        const { access_token } = req.headers

        const decoded = verifyToken(access_token)
        User.findOne({ _id:decoded._id })
        .then(result=>{
            if(result)
              {    
                  if(role === 'all')
                    {
                        next()
                    }
                  else if (result.role === role)
                    {
                        req.decodedUser = decoded
                        next()
                    }
                  else
                    {
                        throw({code:403, message:'Un-Authorized User'})
                    }
              }
            else
              {
                  throw({code:400, message:'User not Found'})
              }
        })
        .catch(err=>{
            next(err)
        })
    }

}