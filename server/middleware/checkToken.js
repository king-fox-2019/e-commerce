const jwt = require('jsonwebtoken');

const jwtUserID = (req, res, next) => {
    try {
        let userID = jwt.verify(req.headers.token, process.env.SECRET_KEY);
        req._id = userID.userId;
        next()
    } catch (err) {
        next(err.message)
    }
};

module.exports = jwtUserID;