module.exports = {
  errorHandler: function(err, req, res, next) {
    switch (err.name) {
      case 'ValidationError':
        const errors = [];
        Object.keys(err.errors).forEach(key => {
          errors.push(err.errors[key].message);
        });
        res.status(400).json({errors});
        break;

      case 'FailedLogin':
        res.status(403).json({errors: err.message});
        break;

      case 'ProductNotFound':
        res.status(404).json({errors: err.message});
        break;

      case 'BadToken':
        res.status(400).json({errors: err.message});
        break;

      case 'MissingToken':
        res.status(400).json({errors: err.message});
        break;

      case 'JsonWebTokenError':
        res.status(400).json({errors: err.message});
        break;

      case 'BadRequest':
        res.status(400).json({errors: err.message});
        break;

      default:
        res.status(500).json(err);
        break;
    }
  },
};
