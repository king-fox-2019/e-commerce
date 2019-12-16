let mongoUri = 'mongodb+srv://admin:admin@clusterecommerce-uondz.gcp.mongodb.net/test?retryWrites=true&w=majority'
if(process.env.NODE_ENV === 'test') {
  mongoUri = 'mongodb://localhost:27017/ecommercetest'
}
else if(process.env.NODE_ENV === 'development') {
  mongoUri = 'mongodb://localhost:27017/ecommercedevelopment'
}

const mongoose = require('mongoose')

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function(err) {
  if(err){
    console.log('failed to connect database')
  } else {
    console.log('database connected')
  }
})