

function errorHandler (err, req, res, next) {

   console.log(err)

   let code = 500
   let message = 'internal server error'

   if(err.code) code = err.code
   if(err.message) message = err.message

   res.status(code).json({message})
}

module.exports = errorHandler