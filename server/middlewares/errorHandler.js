module.exports = (err, req, res, next) => {
  let errStatus
  let messages = []

  console.log('ini err pas error handler skrg', err)

  if (err.name === 'CastError' && err.message.includes('Cast to ObjectId failed', 'Product')) {

    errStatus = 404
    messages.push('Not found!')

  } else if (err.name === 'JsonWebTokenError') {

    errStatus = 401
    messages.push('Unauthorized access!')

  } else if (err.name === 'ValidationError') {

    errStatus = 400
    for (key in err.errors) {
      if (err.errors[key].message) {
        messages.push(err.errors[key].message)
      }
    }

  } else if (err.name === 'MongoError') {

    if (err.keyValue && err.keyValue.email && err.errmsg.includes('duplicate key error')) {
      // console.log('masuk duplicate key error');
      errStatus = 400
      messages.push('Email address has already been used!')
    }

  } else {

    errStatus = err.status
    messages.push(err.message)
    
  }

  res.status(errStatus ? errStatus : 500).json({ messages })
  
  next()
}