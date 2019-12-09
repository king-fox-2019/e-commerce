const mongoose = require('mongoose')
const URI = process.env.MONGODB_URI || 'mongodb://localhost/lazalopedia'
const NODE_ENV = process.env.NODE_ENV

mongoose
  .connect(`${URI}${NODE_ENV ? '-' + NODE_ENV : ''}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('mongodb connected to', URI))
  .catch(err => console.log('mongodb failed to connect\n', err))
