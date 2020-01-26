const jwt = require('jsonwebtoken');

const jwtUserID = (req, res, next) => {
    if (!req.headers.token) throw ({code: 401});
    try {
        let userID = jwt.verify(req.headers.token, process.env.SECRET_KEY);
        req._id = userID.userId;
        next()
    } catch (err) {
        next({code: 401})
    }
};

module.exports = jwtUserID;