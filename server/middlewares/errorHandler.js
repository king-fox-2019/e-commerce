module.exports = (err,req,res,next)=>{
    console.log(`
        ERROR HAPPENED - LOG FROM ERROR HANDLER
        =======================================
    `)
    console.log(err)

    let status =''
    let message = ''

    switch (err.name) {
        case 'ValidationError':
            status = 403 //forbidden
            message = err.message
            break;

        case 'MongoError':
            status= 409 //conflict - duplicate
            const keyPattern = Object.keys(err.keyPattern)
            message = `${keyPattern[0]} has already been used`
            break


        default:
            status = err.code || 500
            message = err.message || 'INTERNAL SERVER ERROR'
            break;
    }


    res.status(status).json( {code: status, message} )


}