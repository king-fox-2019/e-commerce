module.exports = {
    errorHandler: function (err, req, res, next) {
        if (err.name === "CastError") {
            let message = 'Not found'
            res.status(404).json({ message })
        } else if (err.code === 11000) {
            // console.log(err, "masoooookkkkkkkkkk");
            let message = []
            // for (var key in err.keyPattern) {
            message.push('email already registered')
            // }
            res.status(401).json({ message })
        } else {
            switch (err.name) {
                case 'ValidationError': {
                    let message = []
                    for (let key in err.errors) {
                        message.push(err.errors[key].message)
                    }
                    res.status(400).json({ message })
                }
                    break;
                case 'JsonWebTokenError': {
                    let message = []
                    if (err.message === 'invalid signature') {
                        message.push(`You're session is expired. Please login.`)
                    } else if (err.message === 'jwt must be provided') {
                        message.push('you have to login first')
                    } else if (err.message === 'jwt malformed') {
                        message.push('invalid token')
                    } else {
                        message.push(err.message)
                    }
                    res.status(401).json({ message })
                    break;
                }
                case 'MongoError': {
                    // console.log(err);
                    let message = []
                    for (var key in err.keyPattern) {
                        message.push(key + ' already registered')
                    }
                    res.status(401).json({ message })
                }
                    break;
                default:
                    let status = err.status || 500
                    let message = err.message || 'internal server error'
                    // console.log(status, message);
                    // console.log(err);
                    res.status(status).json({ message })
            }
        }
    }
}
