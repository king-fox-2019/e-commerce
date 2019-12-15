
const {verify} = require('../helpers/token')
const Product = require('../models/Product')
function authenticate(req,res,next){
    let token = req.headers.access_token
    if (token) {
        try {
            let payload = verify(token)
            req.id = payload.id
            next()
        } catch (err) {
            next({ code: 400, msg: 'you are not authenticated user' })
        }
    } else {
        next({ code: 400, msg: 'you are not authenticated user' })
    }
}

function authorize(req, res, next){
    let currentId = req.id
    if(currentId == 'renotjaki'){
        next()
    }else{
        next({ code: 400, msg: 'only admin can access this route' })
    }
}

module.exports = { authenticate , authorize }