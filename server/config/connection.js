const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI_ATLAS

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, function (err){
    if(err) console.log('failed to connect database')
    else console.log('Success to connect database')
})

module.exports = mongoose