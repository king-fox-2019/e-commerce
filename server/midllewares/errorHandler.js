module.exports = (err, req, res, next) => {
    console.log(err)
    if (err.status && err.message ) {
     res.status(err.status).json({
            message : err.message
        })
    }
    switch (err.name) {
        case 'ValidationError':
            let messages = []
            if (err.errors) {
                for (let index in err.errors) {
                    messages.push(err.errors[index].message)
                }
            } else {
                messages = err._message
            }
            res.status(400).send({
                message: messages
            })    
        case 'JsonWebTokenError' : {
          res.status(401).send({
                message : "invalid token, please don't change the token in your local storage"
            })
        }             
        case 'CastError' : {
          res.status(404).send({
              message : "not found"
          })
        }
        default:   
        let msg = 'Internal Server Error'
        if(err.Error){
            msg = err.Error
        }         
           res.status(500).send({
                message: msg
            })
    }
}