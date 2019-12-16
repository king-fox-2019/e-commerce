function errorHandler(err, req, res, next){ 
  let code = err.code || 500
  let message = err.message || 'Internal Server Error'
  if (err.code == 11000){
    let fields = Object.keys(err.keyValue)
    message = ''
    for (let key in fields){
      message += 'Choose another ' + fields[key]
    }
    code = 400
  }
  if(err.errors){
    let fields = Object.keys(err.errors)
    message = ''
    for (let key in fields){
      message += fields[key] + ' is required\n'
    }
    code = 400
  }
  res.status(code).json(message)
}

module.exports = errorHandler