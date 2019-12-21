module.exports = function(req, res, next) {
    if (req.decoded.isAdmin == false) {
        let err = {
            status: 400,
            msg: 'You are not authorized.'
        }
        next(err);
    } else {
        next()
    }
}