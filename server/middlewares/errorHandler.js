module.exports = (err, req, res, next) => {
  let status, message;
  console.log(err)

  if (err.name) {
    switch (err.name) {
      case "CastError":
        status = err.code 
        message = err.message 
      break;
      case "ValidationError":
        status = 400;
        message = err.message
    }
  } else {
    status = err.code || 500;
    message = err.message || "Internal server error"
  }

  res.status(status).json({ message: message });
}