const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(_ => {
    console.log('Success to connect database')
})
.catch(_ =>{
    console.log('failed to connect database')
})

module.exports = mongoose