function errorHandler(err, req, res, next) {
  if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    console.log(err)
  }
  switch(err.name) {
    case "ValidationError": {
      err.status = 400
      break
    }
    default: {
      err.status = err.status || 500
      err.message = err.message || "internal server error"
    }
  }
  res.status(err.status).json({message: err.message})
}

module.exports = errorHandler