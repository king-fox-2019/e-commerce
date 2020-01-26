const errHandler = (err, req, res, next) => {
    // console.log(err);

    if (err.name === 'ValidationError') {
        let errItem = "";

        for (let errMsg in err.errors) {
            errItem += `${err.errors[errMsg].message}, `
        }

        res.status(400).json({
            code: 400,
            errMsg: errItem
        })
    } else if (err.code === 11000) {
        res.status(400).json({
            code: 400,
            errMsg: err.errmsg
        })
    } else if (err.code === 400) {
        res.status(err.code).json({
            code: err.code,
            errMsg: err.errMsg
        })
    } else if (err.code === 401) {
        res.status(err.code).json({
            code: err.code,
            errMsg: 'You have no authorized to do this action'
        })
    } else if (err.code === 403) {
        res.status(err.code).json({
            code: err.code,
            errMsg: err.errMsg
        })
    } else if (err.code === 404) {
        res.status(err.code).json({
            code: err.code,
            errMsg: `${err.errMsg} not found`
        })
    } else {
        res.status(500).json({
            code: 500,
            errMsg: 'Internal server error'
        })
    }
};

module.exports = {
    errHandler
};