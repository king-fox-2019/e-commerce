module.exports = (err, req, res, next) => {
  let status, message
  // console.log(err.name)

  switch (err.name) {
    case 'ValidationError':
      status = 422
      message = []
      for (const path in err.errors) {
        message.push(err.errors[path].message)
      }
      break

    case 'JsonWebTokenError':
      status = 401
      message = 'Require valid access_token'
      break

    default:
      status = err.status || 500
      message = err.message || 'Internal Server Error'
      break
  }

  res.status(status).json({ message })
}
