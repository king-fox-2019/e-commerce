`use strict`

const mongoose = require('mongoose')
let MongoURI = ''

if(process.env.NODE_ENV == 'test'){
    MongoURI = process.env.Mongo_URI_TEST
}else if(process.env.NODE_ENV == 'development'){
    MongoURI = process.env.Mongo_URI_DEV
}


mongoose.connect(MongoURI, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
})

    .then(_ => { "connected to database" })
    .catch(_ => { "disconnected to database" });

module.exports = mongoose