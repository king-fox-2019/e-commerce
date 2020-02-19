const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/ecommerce-sportstation'
module.exports = mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
},(err)=>{
    err ? console.log('failed connect database!') : console.log('success connect database')
})