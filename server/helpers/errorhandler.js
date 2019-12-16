function errorHandler (err, req, res, next) {

  console.log('errorHandler invoked');
  console.log('err.name => ',err.name);
  console.log('err.message => ',err.message);

  console.log('======')

  if (err.message == "jwt malformed") {
    console.log('errorHandler 10')
    res.status(403).json({ message : "Token is invalid" })
  } else if (err.message == 'Email/password is required') {
      console.log('errorHandler 13');
      res.status(401).json({ message : 'Email/password is required' })
  } else if (err.message == 'User not found') {
      console.log('errorHandler 16');
      res.status(401).json({ message : 'User not found' })
  } else if (err.message == "Token is undefined") {
      console.log('errorHandler 19');
      res.status(401).json({ message : err.message })
  } else if (err.message == "Email is not registered !") {
      console.log('errorHandler 22')
      res.status(400).json({ message : err.message })
  } else if (err.message == "Password is Invalid !") {
      console.log('errorHandler 25')
      res.status(400).json({ message : err.message })
  } else if (err.message == "Not Authorized as SuperAdmin") {
      console.log('errorHandler 28');
      res.status(401).json({ message : err.message })
  } else if (err.message == "Not Authorized as Admin") {
      console.log('errorHandler 31');
      res.status(401).json({ message : err.message })
  } else if (err.message == "Not Authorized") {
      console.log('errorHandler 34');
      res.status(401).json({ message : err.message })
  } else if (err.message.includes('Product validation failed')) {
      console.log('errorHandler 37');
      res.status(400).json({ message : 'Product validation failed' })
  } else if (err.message.includes('Cart validation failed')) {
      console.log('errorHandler 40');
      res.status(400).json({ message : 'Cart validation failed' })
  } else if (err.message.includes('Cast to ObjectId')) {
      console.log('errorHandler 43');
      res.status(400).json({ message : 'Product ID not found' })
  } else if (err.message == 'Item id not found') {
      console.log('errorHandler 46');
      res.status(400).json({ message : 'Cart ID not found' })
  } else {
    console.log('errorHandler 49');
    let message = err.message || "internal server error"
    let status = err.status || 500

    res.status(status).json({
      message : message
    })
  }
}

module.exports = errorHandler
