module.exports = (err, req, res, next) => {
  let status, message;
  switch (err.name) {
    case "ValidationError":
      status = 400;
      let arrErrors = [];
      for (const error in err.errors) {
        arrErrors.push(err.errors[error].message);
      }
      message = arrErrors;
      break;
    case "JsonWebToken":
      status = 401;
      message = err.message;
      break;
    default:
      status = err.status || 500;
      message = err.message || err.msg || "Internal Server Error";
      break;
  }
  res.status(status).json({ message });
};
