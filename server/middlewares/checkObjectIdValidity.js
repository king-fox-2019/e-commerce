module.exports = (req, res, next) => {
  
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    
    throw {
      status: 404,
      message: 'Transaction not found!'
    }

  } else {
    
    next()
  }
}
