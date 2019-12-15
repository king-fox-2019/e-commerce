const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@clusterecommerce-uondz.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function(err) {
  if(err){
    console.log('failed to connect database')
  } else {
    console.log('database connected')
  }
})