const mongoose = require('mongoose')

mongoose.connect(process.env.URL_DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('Success connecting to database.'))
  .catch(err => console.log('Failed to connect to database...'))

module.exports = mongoose