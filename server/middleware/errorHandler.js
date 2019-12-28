const errHandler = (err, req, res, next) => {
    next(res.status(400).json(err))
};

module.exports = {
    errHandler
};